import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import BookModel from "./bookModel";
import { AuthRequest } from "../middleware/authenticate";
import mongoose from "mongoose";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const files = req.files as {
      coverImage: Express.Multer.File[];
      file: Express.Multer.File[];
    };

    if (!files.coverImage || !files.file) {
      return res
        .status(400)
        .json({ message: "Cover image or book file missing" });
    }

    /* ------------------ Upload Cover Image ------------------ */

    const coverImage = files.coverImage[0];
    const coverImageMimeType = coverImage.mimetype.split("/").pop();
    const coverImagePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      coverImage.filename
    );

    const coverUploadResult = await cloudinary.uploader.upload(coverImagePath, {
      filename_override: coverImage.filename,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    /* ------------------ Upload Book PDF ------------------ */

    const bookFile = files.file[0];
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFile.filename
    );

    const bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFile.filename,
      folder: "book-pdfs",
      format: "pdf",
    });

    /* ------------------ Final Book  ------------------ */

    const _req = req as AuthRequest; // typescript part

    const newBook = await BookModel.create({
      title,
      genre,
      author: _req.userId,
      coverImage: coverUploadResult.secure_url,
      file: bookUploadResult.secure_url,
    });

    // Delete temp files in public folder
    await fs.promises.unlink(coverImagePath);
    await fs.promises.unlink(bookFilePath);

    return res.status(201).json({
      id: newBook._id,
    });
  } catch (error) {
    console.error("Create book error:", error);
    if (createHttpError.isHttpError(error)) {
      return next(error); // keep original status & message
    }
    next(createHttpError(500, "Error while uploading the files"));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const bookId = req.params.bookId;

    const book = await BookModel.findOne({ _id: bookId });
    if (!book) return next(createHttpError(404, "Book not found"));
    // check access to author
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, "Unauthorized"));
    }

    // cast files safely
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    /* ------------------ Update Book Cover ------------------ */
    let completedCoverImage = book.coverImage; // Default to existing
    if (files?.coverImage) {
      const coverFile = files.coverImage[0];
      const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        coverFile.filename
      );

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: coverFile.filename,
        folder: "book-covers",
        format: coverFile.mimetype.split("/").pop(),
      });

      completedCoverImage = uploadResult.secure_url;
      await fs.promises.unlink(filePath);
    }

    /* ------------------ Update Book File ------------------ */
    let completeFileName = book.file; // Default to existing
    if (files?.file) {
      const bookFile = files.file[0];
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFile.filename
      );

      const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: bookFile.filename,
        folder: "book-pdfs",
        format: "pdf",
      });

      completeFileName = uploadResultPdf.secure_url;
      await fs.promises.unlink(bookFilePath);
    }

    /* ------------------ Final Update ------------------ */

    const updatedBook = await BookModel.findOneAndUpdate(
      { _id: bookId },
      {
        title: title || book.title, // Keep old if not provided
        genre: genre || book.genre,
        coverImage: completedCoverImage,
        file: completeFileName,
      },
      { new: true }
    );

    return res.json(updatedBook);
  } catch (error) {
    return next(createHttpError(500, "Error updating book"));
  }
};

const listBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookModel.find();
    res.json(book);
  } catch (error) {
    return next(createHttpError(500, "Error while getting a books"));
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  try {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(createHttpError(400, "Invalid Book ID format"));
    }
    const book = await BookModel.findOne({ _id: bookId });
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    res.json(book);
  } catch (error) {
    return next(createHttpError(500, "Error while getting a books"));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;

  try {
    // 1. Validate ID
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(createHttpError(400, "Invalid Book ID format"));
    }

    // 2. Find the book first to get file URLs and check ownership
    const book = await BookModel.findById(bookId);
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }

    // 3. Authorization check
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(
        createHttpError(403, "You cannot delete someone else's book")
      );
    }

    /* ------------------ Delete from Cloudinary ------------------ */

    // Extract Public IDs from URLs
    // URL format: https://res.cloudinary.com/demo/image/upload/v12345/book-covers/xyz.jpg
    // We need: "book-covers/xyz"

    /* find book cover to delete */
    const coverFileSplits = book.coverImage.split("/");
    const coverImagePublicID =
      coverFileSplits[coverFileSplits.length - 2] +
      "/" +
      coverFileSplits[coverFileSplits.length - 1].split(".")[0];

    /* find book pdf to delete */

    const bookFileSplits = book.file.split("/");
    const bookFilePublicId =
      bookFileSplits[bookFileSplits.length - 2] +
      "/" +
      bookFileSplits[bookFileSplits.length - 1];

    // delete from couldinary
    await Promise.all([
      cloudinary.uploader.destroy(coverImagePublicID),
      cloudinary.uploader.destroy(bookFilePublicId, {
        resource_type: "raw",
      }),
    ]);
    // delete form database
    await BookModel.deleteOne({ _id: bookId });

    return res.sendStatus(204);
  } catch (err) {
    return next(createHttpError(500, "cannot delete a book"));
  }
};
export { createBook, updateBook, listBook, getSingleBook, deleteBook };

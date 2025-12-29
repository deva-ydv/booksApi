import path from "node:path";
import fs from 'node:fs';
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import BookModel from "./bookModel";
import { AuthRequest } from "../middleware/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const {title, genre} = req.body
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const files = req.files as {
      coverImage: Express.Multer.File[];
      file: Express.Multer.File[];
    };

    if (!files.coverImage || !files.file) {
      return res.status(400).json({ message: "Cover image or book file missing" });
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

    const _req = req as AuthRequest

    const newBook = await BookModel.create({
      title,
      genre,
      author:_req.userId,
      coverImage: coverUploadResult.secure_url,
      file: bookUploadResult.secure_url,
    });

    // Delete temp files in public folder
    await fs.promises.unlink(coverImagePath)
    await fs.promises.unlink(bookFilePath)
    
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

export { createBook };

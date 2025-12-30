import path from "node:path";
import express from "express";
import { createBook,listBook,updateBook,getSingleBook,deleteBook } from "./bookController";
import multer from "multer";
import { authenticate } from "../middleware/authenticate";

const bookRouter = express.Router()

// file store local
const upload = multer({
    dest: path.resolve(__dirname,'../../public/data/uploads'), // path of multer data
    limits: {fileSize: 3e7} // 30mb
})

bookRouter.post('/',authenticate,upload.fields([
    {name: 'coverImage', maxCount: 1}, // here maxcount means only 1 cover image/file
    {name: 'file', maxCount: 1}
]),createBook)


bookRouter.patch('/:bookId',authenticate,upload.fields([
    {name: 'coverImage', maxCount: 1}, // here maxcount means only 1 cover image/file
    {name: 'file', maxCount: 1}
]),updateBook)


bookRouter.get('/',listBook)
bookRouter.get('/:bookId',getSingleBook)

bookRouter.delete('/:bookId',authenticate,deleteBook)
export default bookRouter
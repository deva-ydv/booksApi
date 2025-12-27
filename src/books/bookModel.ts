import mongoose, { Schema } from 'mongoose';
import { Book } from './bookTypes'; 

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true 
  }
);

const BookModel = mongoose.model<Book>('Book', bookSchema);

export default BookModel;
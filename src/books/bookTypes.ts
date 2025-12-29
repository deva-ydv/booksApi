import { Types } from "mongoose";

export interface Book {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId; // 👈 NOT User
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}

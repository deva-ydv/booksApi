// import { User } from "../user/userTypes"; // 

// export interface Book {
//     _id: string;
//     title: string;
//     author: User; // author should be logged in user so that's why we are importing UserTypes
//     genre: string;
//     coverImage:string;
//     file: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

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

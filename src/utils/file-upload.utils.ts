import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
    return callback(new Error("Only document files are allowed!"), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, getFileName(fileExtName));
};


export const getFileName = (fileExtName: string): string => {
  const uuid = uuidv4();
  return `${uuid}${fileExtName}`;
};
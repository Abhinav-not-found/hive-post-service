import multer from "multer";
export const uploadSingleImage = multer({ storage: multer.memoryStorage() }).array("images",5);

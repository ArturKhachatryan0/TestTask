import filesController from "../controllers/files.js";
import filesValidation from "../middlewares/filesValidation.js";
import isAuthorization from "../middlewares/isAuthorization.js";

import multer from "multer";
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./files"),
    filename: (req, file, cb) => cb(null, Math.round(Math.random() * 1e9) + "_" + file.originalname),
  }),
});

import { Router } from "express";
const filesRouter = Router();

filesRouter.use(isAuthorization(true));
filesRouter.get("/list", filesController.getFilesList);
filesRouter.get("/:id", filesValidation.getFileInfo, filesController.getFileInfo);
filesRouter.get("/download/:id", filesValidation.downloadFile, filesController.downloadFile);
filesRouter.post("/upload", upload.single("file"), filesController.uploadFile);
filesRouter.put("/update/:id", filesValidation.updateFileInfo, filesController.updateFileInfo);
filesRouter.delete("/delete/:id", filesValidation.deleteFile, filesController.deleteFile);

export default filesRouter;

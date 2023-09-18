import * as path from "node:path";
import filesService from "../services/files.js";

const getFilesList = async (req, res) => {
  const allFilesInfo = await filesService.getAllFilesInfo();
  res.json({ allFilesInfo });
};

const getFileInfo = async (req, res) => {
  const fileInfo = await filesService.getFileInfo({ id: req.params.id });
  res.json(fileInfo);
};

const downloadFile = async (req, res) => {
  const fileInfo = await filesService.getFileInfo({ id: req.params.id });
  const pathToFile = path.resolve("./files", fileInfo.filename);
  res.download(pathToFile, (err) => {
    if (err) return res.status(404).send("File not found");
  });
};

const uploadFile = async (req, res) => {
  const { fileInfoCreated } = await filesService.createFileInfo({
    filename: req.file.filename,
    extension: path.extname(req.file.filename),
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
  if (!fileInfoCreated) return res.status(500).json("Internal error");
  res.json({ status: "success" });
};

const updateFileInfo = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const { fileInfoUpdated } = await filesService.updateFileInfo(id, updates);
  if (!fileInfoUpdated) return res.status(500).json("Internal error");
  res.json({ status: "success" });
};

const deleteFile = async (req, res) => {
  const fileInfo = await filesService.getFileInfo({ id: req.params.id });
  if (!fileInfo) return res.status(409).json("File with same id doesn't exists");
  const { fileInfoDeleted } = await filesService.removeFileInfo(req.params.id);
  if (!fileInfoDeleted) return res.status(500).json("Internal error");
  res.json({ status: "success" });
};

export default {
  getFilesList,
  getFileInfo,
  downloadFile,
  uploadFile,
  updateFileInfo,
  deleteFile,
};

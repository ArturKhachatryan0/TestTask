import database from "../database/mysql/database.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const deleteFile = (filename) => {
  const pathToFile = path.resolve("./files", filename);
  return fs.unlink(pathToFile);
};

const getAllFilesInfo = () => {
  return database("files")
    .then((files) => files)
    .catch((error) => []);
};

const getFileInfo = (fields) => {
  const query = database("files");
  for (const field in fields) {
    query.where(field, fields[field]);
  }

  return query
    .first()
    .then((fileInfo) => fileInfo)
    .catch((error) => null);
};

const createFileInfo = ({ filename, extension, mimetype, size }) => {
  return database("files")
    .insert({
      filename,
      extension,
      mimetype,
      size,
      uploadDate: new Date(),
    })
    .then(() => ({ fileInfoCreated: true }))
    .catch(() => ({ fileInfoCreated: false }));
};

const updateFileInfo = (id, updates) => {
  return database("files")
    .where("id", id)
    .update(updates)
    .then(() => ({ fileInfoUpdated: true }))
    .catch(() => ({ fileInfoUpdated: false }));
};

const removeFileInfo = async (id) => {
  try {
    const fileInfo = await getFileInfo({ id });
    await database("files").where("id", id).del();
    await deleteFile(fileInfo.filename);
    return { fileInfoDeleted: true };
  } catch (e) {
    return { fileInfoDeleted: false };
  }
};

export default {
  getAllFilesInfo,
  getFileInfo,
  createFileInfo,
  updateFileInfo,
  removeFileInfo,
};

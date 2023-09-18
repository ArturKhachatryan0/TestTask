import filesJoi from "../validation/files.js";
import joiMiddleware from "../helpers/joiToMidlewareWrapper.js";

export default {
  getFileInfo: joiMiddleware(filesJoi.getFileInfoSchema),
  downloadFile: joiMiddleware(filesJoi.downloadFileSchema),
  updateFileInfo: joiMiddleware(filesJoi.updateFileInfoSchema),
  deleteFile: joiMiddleware(filesJoi.deleteFileSchema),
};

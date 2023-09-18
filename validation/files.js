import Joi from "joi";

const getFileInfoSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});

const downloadFileSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});

const updateFileInfoSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    filename: Joi.string().optional(),
    extension: Joi.string().optional(),
    mimetype: Joi.string().optional(),
    size: Joi.number().optional(),
  }),
});

const deleteFileSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});

export default {
  getFileInfoSchema,
  downloadFileSchema,
  updateFileInfoSchema,
  deleteFileSchema,
};

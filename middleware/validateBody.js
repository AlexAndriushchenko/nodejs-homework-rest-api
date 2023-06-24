const { HttpError } = require("../helpers");

const validateBody = (schemaName, schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    if (schemaName === "contactStatusSchema") {
      throw HttpError(400, "missing field favorite");
    }
    throw HttpError(400, "missing fields");
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const requiredField = error.details[0].context.label;
    throw HttpError(400, `missing required ${requiredField} field`);
  }
  next();
};

module.exports = { validateBody };

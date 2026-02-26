import joi from "joi";

export const signupValidation = (req, res, next) => {
  if (req.body.address && typeof req.body.address === "string") {
    try {
      req.body.address = JSON.parse(req.body.address);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid address format",
      });
    }
  }

  const schema = joi.object({
    username: joi.string().trim().min(2).required(),
    email: joi.string().trim().email().required(),
    address: joi
      .object({
        city: joi.string().trim().required(),
        state: joi.string().trim().required(),
        country: joi.string().trim().required(),
      })
      .required(),
    password: joi.string().min(6).max(60).required(),
    /* accountStatus: joi
      .string()
      .valid("active", "suspended", "banned")
      .required(), */
    isVerified: joi.boolean().default(false),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message, error });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().min(6).max(60).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message, error });
  }

  next();
};

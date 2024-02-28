import Joi from "joi";

describe("Joi", () => {
  it("should can create custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("12345")) {
            return helpers.error("password.wrong");
          }
          return value;
        })
        .messages({
          "password.wrong": "Password can't start with 12345",
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        }
        return value;
      })
      .messages({
        "register.password.different":
          "Password and Confirmation Password is different",
      });

    const request = {
      username: "budi@bing.com",
      password: "budi12345678",
      confirmPassword: "berbeda",
    };

    const result = registerSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });
});

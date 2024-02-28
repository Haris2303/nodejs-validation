import Joi from "joi";

describe("Joi", () => {
  it("should can use custome messages", () => {
    const schema = Joi.string().min(3).max(100).required().messages({
      "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
      "string.max": "{{#label}} panjang harus maksimal {{#limit}} karakter",
    });

    const request = "a";

    const result = schema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });

  it("should can use custom messages in object validation", () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        "any.required": "{{#label}} harus diisi",
        "string.email": "{{#label}} harus valid email",
      }),
      password: Joi.string().required().min(6).max(10).messages({
        "any.required": "{{#label}} harus diisi",
        "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
        "string.max": "{{#label}} panjang harus maksimal {{#limit}} karakter",
      }),
    });

    const request = {
      username: "Ucup@test.io",
      password: "ucup123",
    };

    const result = schema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });
});

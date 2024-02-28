import Joi from "joi";

describe("Joi", () => {
  it("should can create schema", () => {
    const schema = Joi.string().min(3).max(100).required();
    const request = "Otong";
    const result = schema.validate(request);

    if (result.error) {
      console.error(result.error);
    }
  });

  it("should can validate basic data type", () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("otong@yahoo.com");
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);
  });
});

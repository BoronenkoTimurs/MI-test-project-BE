import crypto from "crypto";

const SECRET = "TIMUR_AUTHENTICATION_FOR_USER";

export const random = () => {
  return require("crypto").randomBytes(128).toString("base64");
};
export const authentication = (salt: String, password: String) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

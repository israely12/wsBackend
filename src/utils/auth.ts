import jwt from "jsonwebtoken";
export const generateToken = ( id: string, organization: string| undefined): string => {
  return jwt.sign({ id, organization }, process.env.JWT_SECRET as string, {
    expiresIn: "20h",
  });
};

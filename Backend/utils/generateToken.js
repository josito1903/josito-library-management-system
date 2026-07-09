import jwt from "jsonwebtoken";

export const generateToken = (
  user,
  statusCode,
  message,
  res
) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES || "7d",
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000
    ),
  };

  const userData = user.toObject
    ? user.toObject()
    : { ...user };

  delete userData.password;

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      token,
      user: userData,
    });
};
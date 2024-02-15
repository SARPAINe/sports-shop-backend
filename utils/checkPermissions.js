const CustomError = require("../errors");
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError("Not authroized to access this data");
};

module.exports = checkPermissions;

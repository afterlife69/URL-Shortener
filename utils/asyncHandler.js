export default function asyncHandler(F) {
  return async function (req, res, next) {
    try {
      await F(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
const asyncHandler = (fn) => {
  return (req, res, next) => {
    console.log("catch middle")
    fn(req, res, next).catch(next);
  };
};

module.exports = asyncHandler;

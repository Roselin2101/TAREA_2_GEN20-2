const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: ['id', 'name', 'email'],
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});

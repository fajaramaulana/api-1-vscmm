const jwt = require('jsonwebtoken');
const {User, Role} = require('../database/models'); // Import your User model
const response = require('../utils/response');

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
        .status(401)
        .json(response
            .error('Unauthorized', 401, 'Unauthorized'));
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user associated with the token exists
    const user = await User.findOne(
        {
          where: {user_id: decoded.user_id},
          include: [
            {
              model: Role,
              as: 'Roles',
              through: {
                attributes: [],
              },
            },
          ],
        },
    );

    if (!user) {
      return res
          .status(401)
          .json(response.error('Unauthorized', 401, 'Unauthorized'));
    }

    // Attach the user information to the request object
    req.user = user;
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res
        .status(401)
        .json(response.error('Unauthorized', 401, 'Unauthorized'));
  }
};

module.exports = {authenticateJWT};

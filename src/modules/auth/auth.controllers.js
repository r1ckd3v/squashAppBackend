const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');

function signJwt(payload, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      options || { expiresIn: '1h' },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}

exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'email and password are required' });

  // check existing user
  Users.findOne({ where: { email } })
    .then((existing) => {
      if (existing) {
        return res.status(409).json({ message: 'email already registered' });
      }
      // hash password
      return bcrypt
        .hash(password, 10)
        .then((hashed) => Users.create({ email, password: hashed }))
        .then((user) =>
          signJwt({ id: user.user_id }, { expiresIn: '1h' }).then((token) =>
            res.status(201).json({
              message: 'user created',
              user: { id: user.user_id, email: user.email },
              token,
            })
          )
        );
    })
    .catch((err) => {
      console.error('signup error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'email and password are required' });

  Users.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.status(401).json({ message: 'user not found' });

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return res.status(401).json({ message: 'invalid credentials' });

        return signJwt({ id: user.user_id }, { expiresIn: '1h' }).then(
          (token) =>
            res.json({
              message: 'login successful',
              user: { id: user.user_id, email: user.email },
              token,
            })
        );
      });
    })
    .catch((err) => {
      console.error('login error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

// whoami using decoded id from middleware
exports.me = (req, res) => {
  // req.user is set by auth middleware
  Users.findByPk(req.user.id, { attributes: ['user_id', 'email'] })
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'user not found' });
      res.json({ id: user.user_id, email: user.email });
    })
    .catch((err) => {
      console.error('me error:', err);
      res.status(500).json({ message: 'internal error' });
    });
};

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req, res, next}) {
    // console.log('WE R IN MIDDLEWARE!!!')
    let token = req.query.token || req.headers.authorization || req.body.token;

    // console.log('token i shere!!', token)
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

 

    if (!token) {
      return req
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // console.log('dat !!! from signing and verigy the toke!', data)
      req.user = data;
      return req
    } catch (err) {
      console.log('Invalid token', err);
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    return req
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

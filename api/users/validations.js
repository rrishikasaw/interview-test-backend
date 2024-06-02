function register(req, res, next) {
  let {
    name,
    email,
    password,
  } = req.body;

  if (!name) {
    return res.status(404).json({ message: 'name is  required' });
  }

  if (typeof name !== 'string') {
    return res.status(404).json({ message: 'name must be string' });
  }

  if (!email) {
    return res.status(404).json({ message: 'email is required' });
  }

  if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  ) {
    return res.status(404).json({ message: 'Please enter valid email!' });
  }

  if (!password) {
    return res.status(404).json({ message: 'password is  required' });
  }

  if (typeof password !== 'string') {
    return res.status(404).json({ message: 'password must be string' });
  }

  if (password.length < 3) {
    return res.status(404).json({ message: 'password is too short' });
  }

  return next();
}

function login(req, res, next) {
  let { email, password } = req.body;

  if (!email) {
    return res.status(404).json({ message: 'email is required' });
  }

  if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  ) {
    return res.status(404).json({ message: 'Please enter valid email!' });
  }

  if (!password) {
    return res.status(404).json({ message: 'password is  required' });
  }

  if (typeof password !== 'string') {
    return res.status(404).json({ message: 'password must be string' });
  }

  if (password.length < 3) {
    return res.status(404).json({ message: 'password is too short' });
  }

  return next();
}

function checkLogin(req, res, next) {
  return next();
}

module.exports = {
  register,
  login,
  checkLogin,
};

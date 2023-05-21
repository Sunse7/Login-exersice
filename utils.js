function checkBody(request, response, next) {
  const newUser = request.body;

  if (
    newUser.hasOwnProperty("user") &&
    newUser.hasOwnProperty("email") &&
    newUser.hasOwnProperty("password")
  ) {
    next();
  } else {
    response.status(400).json({ success: false, error: 'Wrong data in body' });
  }
}

module.exports = { checkBody }
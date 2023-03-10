const Users = require("../models/user");
const handleErrors = require ("../utils/handleErrors")

const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "please provide neccesary information",
    });
  }
  try {
    const user = await Users.create({ ...req.body });
    const token = user.generateToken();
    res
      .status(201)
      .json({ data: { name: user.name, email: user.email }, token });
  } catch (error) {
    const errors = HandleErrors(error)
res.status(400).json({errors})
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "please provide neccesary details" });
  }
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw Error("incorrect Email")
      // return res.status(400).json({ success: false });
    }
    const authenticated = await user.comparePassword(password);
    if (!authenticated) {
      return res.status(400).json({ success: false });
    }
    const token = user.generateToken();
    res
      .status(200)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (error) {}
};

module.exports = { register, login };

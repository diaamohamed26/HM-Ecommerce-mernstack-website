
// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // validate user

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id), // send token back on login
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


export default generateToken;

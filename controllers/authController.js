require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Invalid credentials');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in the environment variables');
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      console.log('User logged in successfully');
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// };

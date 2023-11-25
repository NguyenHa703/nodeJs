const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const createUserVailidator = require('../validations/user');

dotenv.config();

const { SECRET_CODE } = process.env;

class UsersController {
  // [GET] /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //[GET]//users/ :id
  async getUserDetail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }


  
  //[GET] /login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body
      const { error } = createUserVailidator.validate(req.body, {
        abortEarly: false
      });
      if (error) {
        console.log(error.details);
        return res.json({ message: error })
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: 'Email nay chua dang ky, ban co muon dang ky khong??'
        })
      }

      const isMatch = bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Email or Password không đúng, vui lòng kiểm tra lại!',
        });
      }

      // Bước 4: Tạo ra token
      const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
        expiresIn: '1d',
      });

      res.json({
        message: 'Login successfull',
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //post /users
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      // b1:validate values
      const { error } = createUserVailidator.validate(req.body, {
        abortEarly: false, // check hết các lỗi
      });
      if (error) {
        console.log(error.details);
        return res.json({ message: error });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          message: "Email này đã được đăng ký",
        });
      }
      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({ username, email, password: hashPassword });
      res.status(200).json({ message: "Add user successfull" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      User.deleteOne(req.params.id);
      res.status(200).json({ mess: "ok" });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}
module.exports = new UsersController();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.home = async (req, res, next) => {
  res.send("This is the Home Page")
}

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username is already in use", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email is already in use", status: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log("Some error occurred : " + error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userCheck = await User.findOne({ username });
    if (!userCheck) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        userCheck.password
      );
      if (!isPasswordValid) {
        return res.json({
          msg: "Incorrect Username or Password",
          status: false,
        });
      } else {
        delete userCheck.password;
        return res.json({ status: true, userCheck });
      }
    }
  } catch (error) {
    console.log("Some error occurred : " + error);
  }
};

module.exports.setavatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    },{new:true});
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
    
  } catch (error) {
    console.log(error);
  }
};


module.exports.getAllusers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "_id",
      "avatarImage",
      "email"
    ]);
    res.json(users)
  } catch (error) {
    console.log(error)
  }
};

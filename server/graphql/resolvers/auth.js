const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const { email, password } = args.userInput;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword
      });

      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};

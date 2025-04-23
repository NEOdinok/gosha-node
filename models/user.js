import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { isEmail } = validator;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login a user
userSchema.statics.login = async function (email, password) {
  // user is user model itself
  // find a user in a db
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  // hash the entered password, compare to make sure password is correct
  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;

const { default: mongoose } = require("mongoose");
// const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    data: Buffer,
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  home_address: {
    type: String,
    trim: true,
  },
  phone_otp: {
    type: String,
    trim: true,
  },
  date: { type: Date, default: Date.now },
});

// UserSchema.pre("save", async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel

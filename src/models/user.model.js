const { Schema, model } = require('mongoose');
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Eliminamos el password del documento
userSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
}
// Comparamos el password encriptado
userSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
}
// Encriptamos la contraseña
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = model('user', userSchema);
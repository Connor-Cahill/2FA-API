const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Bool, default: false },
});


UserSchema.pre('save', (next) => {
  // if password is empty
  if (this.password === null || this.password === '') {
    console.log('Error: User must have password.');
    return next();
  }
  return next();

})

/**
 * generateHash encrypts user password before
 * it is saved to database.
 *
 * @params
 * password: String
 */
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


/**
 * comparePassword compares inputted password against the encrypted password
 * to authenticate user
 *
 * @params
 * password: String
 * done: callback
 */
UserSchema.methods.comparePassword = function(password, done) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);

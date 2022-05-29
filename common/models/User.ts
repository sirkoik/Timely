import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

// salt and hash the password prior to saving it.
// uses bcrypt
UserSchema.pre(
  'save',
  function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    const user = this;

    // only hash password if it is modified or new.
    // otherwise, escape from this function.
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
      if (err) return next(err);

      // hash password using the generated salt
      bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
        if (err) {
          return next(err);
        }

        // override the cleartext password in the instance with the hashed one
        user.password = hash;
        next();
      });
    });
  }
);

// comparePassword: make sure that the password was saved correctly.
UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

export const User = mongoose.model('User', UserSchema, 'users');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  // username
    username: {
        type: String,
        required: [true, "Username field is required!"]
    },
    // email
    email: {
        type: String,
        required: [true, "Email field is required!"]
    },
    // password
    password: {
        type: String,
        required: [true, "Password field is required!"],
        minLength: [8, "Password must be at least 8 characters!"]
    }
    }, { timestamps: true});


    UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);


    UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords do not match");
    }
    next();
    });


    UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
        this.password = hashedPassword;
        next();
        })
    })

const User = mongoose.model("User", UserSchema);

module.exports = User;
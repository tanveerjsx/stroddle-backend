var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Token = require('./token');
const jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
        max: 255
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    let payload = {
        id: this._id,
        email: this.email
    };
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};
UserSchema.methods.generateVerificationToken = function () {
    let payload = {
        userId: this._id,
        token: randomstring.generate({
            length: 6,
            charset: 'numeric'
        })
    };

    return new Token(payload);
};

module.exports = mongoose.model('User', UserSchema);
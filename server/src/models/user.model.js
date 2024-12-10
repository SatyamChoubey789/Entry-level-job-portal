const mongoose = require('mongoose');
const Schema = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const process = require("process");


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video', // Placeholder for other models
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['job_seeker', 'employer', 'admin'],
      required: true,
    },
    location: {
      type: String,
      required: false, // Optional for basic user creation
    },
    skills: {
      type: [String], // Relevant for job seekers
      default: [],
    },
    experience: {
      type: Number, // Years of experience (if job seeker)
      default: 0,
    },
    company: {
      type: String, // Relevant for employers
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Password hashing before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Check if the password is correct
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

module.exports = mongoose.model('User', UserSchema);

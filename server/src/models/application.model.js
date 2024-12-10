const mongoose = require('mongoose');
const Schema = require('mongoose');

const ApplicationSchema = mongoose.Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'hired'],
      default: 'applied',
    },
    resume: {
      type: String, // URL of the uploaded resume
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Application', ApplicationSchema);
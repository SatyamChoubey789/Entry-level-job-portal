const mongoose = require("mongoose");
const Schema = require('mongoose');

const JobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Plumber", "Driver"
    salaryRange: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['full_time', 'part_time', 'contract'],
      required: true,
    },
    location: { type: String, required: true },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to employer
      required: true,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Job', JobSchema);
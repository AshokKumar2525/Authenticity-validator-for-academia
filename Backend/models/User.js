const mongoose = require("mongoose");
const { Schema } = mongoose;

// Base schema (common fields)
const userSchema = new Schema({
  name: { type: String, required: true },   // Org/Dept/University Name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["employer", "government", "university"], required: true },
  status: {type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING"},
  lastLogin: Date
}, { discriminatorKey: "userType", timestamps: true });

const User = mongoose.model("User", userSchema);

// Employer / Recruiter
const employerSchema = new Schema({
  contactNumber:Number,
  contactPerson: String,
  companyDomain: String,
  designation: String,
  industry: String,
  location: String
});
const Employer = User.discriminator("employer", employerSchema);

// Government
const governmentSchema = new Schema({
  govtId:String,
  departmentType: { type: String, required: true }, // e.g., HigherEducation
  state: { type: String, required: true },
//   accessLogs: [
//     {
//       timestamp: { type: Date, default: Date.now },
//       action: { type: String }
//     }
//   ]
});
const Government = User.discriminator("government", governmentSchema);

// University / Institution
const universitySchema = new Schema({
  universityId: { type: String, required: true },
  contactNumber: { type: Number },
  publicKey: { type: String },
  registeredByGov: { type: mongoose.Schema.Types.ObjectId, ref: "Government" },
  databaseConnection: {
    dbType: { type: String, enum: ["MySQL", "PostgreSQL", "MongoDB"] },
    endpoint: { type: String }, // e.g., "db.ranchiuniv.ac.in:3306"
    authMethod: { type: String }, // e.g., "secureKey/ssl"
    lastSync: { type: Date, default: Date.now },
    syncFrequency: { type: String, enum: ["YEARLY", "MONTHLY", "ON_DEMAND"], default: "YEARLY" }
    
  },
  forgeryCount: { type: Number, default: 0},
  VerificationStatus: { 
    totalVerified: {type: Number, default: 0},
    lastVerified: Date
  },
  location: String
});
const University = User.discriminator("university", universitySchema);

module.exports = { User, Employer, Government, University };
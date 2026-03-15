// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // 🔹 Champs de base
  name: { type: String, required: [true, "Le nom est obligatoire"], trim: true },
  email: { 
    type: String, 
    required: [true, "Email obligatoire"], 
    unique: true, 
    lowercase: true, 
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
  },
  password: { 
    type: String, 
    required: [true, "Mot de passe obligatoire"], 
    minlength: [6, "Minimum 6 caractères"]
  },

  // 🔹 Champs avec valeur par défaut
  role: { type: String, enum: ["admin", "agent", "user"], default: "agent" },
  age: { type: Number, min: 18, max: 99, default: 18 },
  active: { type: Boolean, default: true },

  // 🔹 Dates et version
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },

  // 🔹 Relation avec une autre collection
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],

  // 🔹 Champs mix ou flexible
  meta: { type: mongoose.Schema.Types.Mixed },

}, {
  timestamps: true,     // createdAt et updatedAt automatiques
  versionKey: false,    // supprime __v
  strict: true          // interdit les champs non définis
});

// 🔹 Virtual (champ calculé)
userSchema.virtual("fullName").get(function() {
  return this.name.toUpperCase();
});

// 🔹 Middleware / hooks
userSchema.pre("save", function(next) {
  // Exemple : trim password si nécessaire
  this.password = this.password.trim();
  next();
});

// 🔹 Export du modèle
const User = mongoose.model("User", userSchema);
export default User;

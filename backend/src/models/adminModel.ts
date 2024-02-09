import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface Admin extends Document{
    name:string;
    email: string;
    phone: string;
    password: string;
    role:string;
    verified: boolean;
    address: string;


}
const adminSchema: Schema<Admin> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'], // Adjust roles as needed
    default: 'admin',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
});

// Hash the password before saving to the database
adminSchema.pre('save', async function (next) {
  const admin = this as Admin;

  // Hash the password only if it's modified or new
  if (!admin.isModified('password')) return next();

  // Generate a salt and hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(admin.password, saltRounds);

  // Replace the plain text password with the hashed password
  admin.password = hashedPassword;

  next();
});

// Compare entered password with stored hashed password
adminSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const AdminModel = mongoose.model<Admin>('Admin', adminSchema);

export default AdminModel;

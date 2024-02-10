import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IConsultation } from './consultationModel';


export interface IDoctor extends Document {
  name: string;
  email: string;
  phone: string;
  salt: string;
  role: string;
  password: string;
  address: string;
  consultations: mongoose.Types.ObjectId[] | IConsultation;
  designation: 'General Practitioner' | 'Surgeon' | 'Specialist' | 'Other'; // Update with your specific designations
}

const doctorSchema: Schema<IDoctor> = new Schema({
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
  salt: {
    type: String,
  },
  designation: {
    type: String,
    enum: ['General Practitioner', 'Surgeon', 'Specialist', 'Other'],
  },
  consultations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Consultation', // Reference to Consultation model
    },
  ],
  address: {
    type: String,
  },
},{
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

// Hash the password before saving to the database
// doctorSchema.pre<IDoctor>('save', async function (next) {
//   const doctor = this;

//   // Only hash the password if it's modified or new
//   if (!doctor.isModified('password')) return next();

//   // Generate a salt and hash the password
//   const saltRounds = 10;
//   doctor.salt = await bcrypt.genSalt(saltRounds);
//   doctor.password = await bcrypt.hash(doctor.password, doctor.salt);

//   next();
// });

// Compare entered password with stored hashed password
doctorSchema.methods.comparePassword = async function (
    enteredPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
  };
  

const DoctorModel = mongoose.model<IDoctor>('Doctor', doctorSchema);

export default DoctorModel;

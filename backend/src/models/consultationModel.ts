import mongoose, { Document, Schema } from 'mongoose';
import { IDoctor } from './doctorModel';

// Define the Patient interface
interface IPatient {
  
}

export interface IConsultation extends Document {
  date: Date;
  doctor: mongoose.Types.ObjectId | string | IDoctor;
  patient: mongoose.Types.ObjectId | string | IPatient;
  
}

const consultationSchema: Schema<IConsultation> = new Schema({
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to Doctor model
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient', // Reference to Patient model
  },
  
});

const ConsultationModel = mongoose.model<IConsultation>('Consultation', consultationSchema);

export default ConsultationModel;

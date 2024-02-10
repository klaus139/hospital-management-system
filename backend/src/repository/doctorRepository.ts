import DoctorModel from "../models/doctorModel";
import { APIError, STATUS_CODES } from "../utils/app-error";

interface IDoctor{
    name: string;
    email:string;
    password: string;
    phone:string;
    address: string
}
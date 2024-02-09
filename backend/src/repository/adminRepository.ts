import AdminModel from "../models/adminModel";
import { APIError, STATUS_CODES } from "../utils/app-error";

interface IAdmin{
    name:string;
    email:string;
    password:string;
    phone:string;
    address:string;
    salt:string;
}

export class AdminRepository {
  async createAdmin({ name, email, password, phone, address, salt }:IAdmin) {
    try {
      const admin= new AdminModel({
        name,
        email,
        password,
        phone,
        address,
        salt
      })
      const adminResults = await admin.save();
      return adminResults;

    } catch (err:any) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Admin", true, "", true)
    }
  }
  async findAdmin({ email }: { email: string }) {
    try {
      const existingAdmin = await AdminModel.findOne({ email });
      //console.log(existingAdmin);

      if (!existingAdmin) {
        // Handle the case where no admin is found with the specified email
        throw new APIError("Not Found", STATUS_CODES.NOT_FOUND, "Admin not found", true, "", true);
      }

      return existingAdmin;
    } catch (err) {
      // Handle other errors
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to find admin", true, "", true);
    }
  }
}

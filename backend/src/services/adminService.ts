import { AdminRepository } from "../repository/adminRepository";
import {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utils";
import { APIError, STATUS_CODES } from "../utils/app-error";

class AdminService {
  repository: any;

  constructor() {
    this.repository = new AdminRepository();
  }

  async SignUp(userInputs: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }) {
    const { name, email, password, phone, address } = userInputs;
    if (!name || !email || !password || !phone || !address) {
      throw new APIError(
        "API ERROR",
        STATUS_CODES.BAD_REQUEST,
        "Missing required fields",
        true,
        "",
        true
      );
    }

    try {
      // create salt
      const salt = await GenerateSalt();
      console.log(salt);

      const userPassword = await GeneratePassword(password, salt);
      //   console.log(userPassword);

      const newAdmin = await this.repository.createAdmin({
        name,
        email,
        password: userPassword,
        phone,
        address,
        salt,
      });

      const token = await GenerateSignature({
        email: email,
        _id: newAdmin._id,
      });

      return FormateData({ id: newAdmin._id, token });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Data Not found",
        true,
        "",
        true
      );
    }

  }

  async signIn(userInputs: { email: string; password: string }) {
    const { email, password } = userInputs;

    try {
      const existingAdmin = await this.repository.findAdmin({ email });
      console.log("existingAdmin:", existingAdmin);

      if (existingAdmin) {
        const validPassword = await ValidatePassword(password, existingAdmin.password, existingAdmin.salt);
        console.log("validPassword:", validPassword);

        if (validPassword) {
          const token = await GenerateSignature({ email: existingAdmin.email, _id: existingAdmin._id });

          return FormateData({ id: existingAdmin._id, token });
        }
      }

      return FormateData(null);
    } catch (err) {
      console.error(err); // Log the actual error for debugging
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Data Not found here", true, "", true);
    }
  }

}

export default AdminService;

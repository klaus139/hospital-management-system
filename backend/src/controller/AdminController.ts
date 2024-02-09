import express, { Request, Response, NextFunction } from "express";
import AdminService from "../services/adminService";

export const admin= (app:express.Application) => {
  const service = new AdminService();

  app.post("/admin/signup", async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { name, email, password, phone, address } = req.body;
      const { data } = await service.SignUp({ name, email, password, phone, address });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/admin/login", async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.signIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

}

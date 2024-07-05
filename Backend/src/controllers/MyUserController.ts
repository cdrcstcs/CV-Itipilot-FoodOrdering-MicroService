import { Response } from "express";
import User from "../models/user";
import { AuthenticatedRequest } from "../interface/request";
const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: (await User.findOne())?._id });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export default {getCurrentUser};
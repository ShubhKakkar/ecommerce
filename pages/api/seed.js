import User from "../../models/User";
import { users } from "../../utils/data";
import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
    connectToDatabase();
    await User.deleteMany();
    await User.insertMany(users);
}
"use server"
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
//import bcrypt from "bcryptjs";
import axios from 'axios';

const USER_HOST_URL = 'http://localhost:5000/user';
export const register = async (values) => {
    const { email, password, name } = values;

    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: 'Email already exists!'
            }
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password
            // password: hashedPassword,
        });
        const savedUser = await user.save();

        const res = await axios.post(`${USER_HOST_URL}/insert`, {
            name,
            email,
            password
        });

        if (res.status !== 200) {
            return {
                error: 'Error while creating user in the database (in user service)'
            }
        } else {
            console.log("User created in the database (in user service)");
        }

    } catch (e) {
        console.log(e);
    }
}
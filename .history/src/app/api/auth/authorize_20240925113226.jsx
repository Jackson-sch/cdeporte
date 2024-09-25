import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";

export async function authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  await dbConnect();

  const user = await User.findOne({ email: credentials.email }).select("+password");

  if (!user || !user.password) {
    return null;
  }

  const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

  if (!isPasswordCorrect) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
}
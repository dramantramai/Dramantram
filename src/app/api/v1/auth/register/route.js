import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import userModel from "@/lib/models/userModel";
import { hashPassword } from "@/lib/auth/authHelper";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, phone } = await request.json();

    if (!name) return NextResponse.json({ message: "Name is required" });
    if (!email) return NextResponse.json({ message: "Email is required" });
    if (!password)
      return NextResponse.json({ message: "Password is required" });
    if (!phone)
      return NextResponse.json({ message: "Phone number is required" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Already registered, please login" },
        { status: 200 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    return NextResponse.json(
      { success: true, message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error in registration" },
      { status: 500 }
    );
  }
}

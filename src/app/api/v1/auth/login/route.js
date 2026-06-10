import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import userModel from "@/lib/models/userModel";
import { comparePassword } from "@/lib/auth/authHelper";
import JWT from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 404 }
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email not registered" },
        { status: 404 }
      );
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid Password" },
        { status: 200 }
      );
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error in login" },
      { status: 500 }
    );
  }
}

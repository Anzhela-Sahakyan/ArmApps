import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request, response: NextApiResponse) {
  try {
    const requestBody = await request.json();
    console.log("request body:::", requestBody);
    const { email, password, rememberMe } = requestBody;
    const { data: users } = await axios.get("http://localhost:3002/users");

    const user = users.find((user: any) => user.email === email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validatePassword = password === user.password;
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: rememberMe ? "30d" : "1d",
    });

    const jsonResponse = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    jsonResponse.cookies.set("token", token, {
      httpOnly: true,
    });

    return jsonResponse;
  } catch (error: any) {
    console.log(error, "error:::");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

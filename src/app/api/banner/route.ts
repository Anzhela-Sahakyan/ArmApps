import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db.json";

export async function POST(request: Request, response: Response) {
  try {
    const body = await request.json();
    console.log("body:::", body);
    const newBanner: {
      id: number;
      name: string;
      image: string;
      showInMobile: boolean;
    } = body;

    db.banners.push(newBanner);

    return NextResponse.json({
      success: true,
      status: 200,
      data: newBanner,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

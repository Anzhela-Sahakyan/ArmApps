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
    const bannerIndex = db.banners.findIndex(
      (banner) => banner.id === newBanner.id
    );

    if (bannerIndex !== -1) {
      db.banners[bannerIndex] = {
        ...db.banners[bannerIndex],
        ...newBanner,
      };
      return NextResponse.json({
        success: true,
        status: 200,
        data: newBanner,
      });

      // db.banners.push(newBanner);
    } else {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

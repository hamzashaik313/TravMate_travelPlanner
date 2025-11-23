// Example for Next.js App Router (route.ts)
import { NextResponse } from "next/server";

let userProfile = {
  firstName: "Hamza",
  lastName: "Shaik",
  email: "hamzashaik98854@gmail.com",
  preferredCurrency: "INR",
  preferredLanguage: "English",
};

export async function GET() {
  return NextResponse.json(userProfile);
}

export async function PUT(req: Request) {
  const body = await req.json();
  userProfile = { ...userProfile, ...body };
  return NextResponse.json({ success: true, updated: userProfile });
}

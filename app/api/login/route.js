import { NextResponse } from 'next/server'
import { login } from 'lib/auth'

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const tokenInfo = await login(email, password)
    const response = NextResponse.json({ success: true })
    response.cookies.set(
      'Bearer', 
      JSON.stringify(tokenInfo), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: tokenInfo.expires_in,
        sameSite: "strict",
        path: "/",
      }
    )
    return response
  } catch (error) {
    return NextResponse.json({ success: false }) 
  }
};
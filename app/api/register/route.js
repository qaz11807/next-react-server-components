import { NextResponse } from 'next/server'
import { register } from 'lib/auth'

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const tokenInfo = (await register(email, password)).data.token_info
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
  } catch(err) {
    return NextResponse.json({ success: false })
  }
};
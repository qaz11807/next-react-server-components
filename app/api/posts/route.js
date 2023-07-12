import { NextResponse } from 'next/server'
import { AuthError } from "lib/errors";
import { create } from 'lib/posts'

export async function POST(req) {
  const { title, url } = await req.json();

  try {
    await create(title, url)

    return NextResponse.json({ success: true })
  } catch(err){
    if (err instanceof AuthError) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.json({ success: false })
  }
};
import { NextResponse } from 'next/server'
import { AuthError } from "lib/errors";
import { vote } from 'lib/posts'

export async function POST(req, { params }) {
  const { id } = params;

  try {
    await vote(id)
  } catch(err){
    if (err instanceof AuthError) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.json({})
};
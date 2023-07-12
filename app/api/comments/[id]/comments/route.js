import { NextResponse } from 'next/server'
import { AuthError } from "lib/errors";
import { addComment } from 'lib/comments'

export async function POST(req, { params }) {
  const { id } = params;
  const { text } = await req.json();

  try {
    await addComment(id, text)
  } catch(err){
    if (err instanceof AuthError) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.json({})
};
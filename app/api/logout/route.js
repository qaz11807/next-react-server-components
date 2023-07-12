import { NextResponse } from 'next/server'
import { revoke } from 'lib/auth'
import { getTokenFromCookie } from 'lib/get-token-cookie'

export async function POST(req) {
  const token = await getTokenFromCookie()
  await revoke(token)

  const response = NextResponse.json({})
  response.cookies.delete('Bearer')

  return response
};
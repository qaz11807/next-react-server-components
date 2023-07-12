import { cookies } from "next/headers";
import { refresh } from "./auth";

export async function getTokenFromCookie() {
  const tokenCookie = cookies().get("Bearer");

  if(!tokenCookie) {
    return
  }

  const tokenInfo = JSON.parse(tokenCookie.value);

  const createAt = Date.parse(tokenInfo.created_at);
  const timeDiff = (new Date().getTime() - createAt) / 1000

  if(timeDiff >= tokenInfo.expires_in) { 
    const refreshedTokenInfo = await refresh(tokenInfo.refresh_token);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: refreshedTokenInfo.expires_in,
      sameSite: "strict",
      path: "/",
    }
    
    // @ts-ignore
    cookies().set('Bearer', JSON.stringify(refreshedTokenInfo), options)

    return refreshedTokenInfo.access_token
  } else {
    return tokenInfo.access_token
  }
}
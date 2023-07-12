import { getTokenFromCookie } from "./get-token-cookie";
import { AuthError } from "./errors";
import 'server-only'

type ApiMethod = 'POST' | 'GET'

export default async function (path: string, params = {}, method: ApiMethod = 'GET', withPrefix =  true)  {
  let options: RequestInit = {
    method
  };

  const accessToken = await getTokenFromCookie()
  if (accessToken) {
    options.headers = { ...options.headers, 'Authorization': `Bearer ${accessToken}` }
  }

  let url = process.env.API_HOST + (withPrefix ? '/api/v1' : '') + path
  if ( 'GET' === method ) {
    url += '?' + ( new URLSearchParams( params ) ).toString();
  } else {
    options = { ...options, body: JSON.stringify( params ) };
    options.headers = { ...options.headers, 'Content-Type': 'application/json' }
  }

  const res = await fetch( url, options )
  if (res.status === 200) {
    return res.json()
  }
  
  if (res.status === 401){
    throw new AuthError(`Status ${res.status}`)
  } 
    
  throw new Error(`Status ${res.status}`)
}

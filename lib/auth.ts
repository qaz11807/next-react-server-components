import requester from './requester'

export const login = async (email: string, password: string) => {
  const payload = {
    username: email, 
    password: password,
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }
  const response = await requester('/oauth/token', payload, 'POST', false)

  return response
}

export const refresh = async (refreshToken: string) => {
  const payload = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }
  const response = requester('/oauth/token', payload, 'POST', false)

  return response 
}

export const register = async (email: string, password: string) => {
  const payload = {
    username: email, 
    password: password,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }

  const response = await requester('/user/register', payload, 'POST')

  return response
}

export const revoke = async (token) => {
  const payload = {
    token: token, 
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }

  const response = await requester('/oauth/revoke', payload, 'POST', false)

  return response
}

import requester from './requester'

export const vote = async (id: number) => {
  const response = await requester(`/comments/${id}/votes`, {}, 'POST')

  return response.data
}

export const addComment = async (id: number, text: string) => {
  const response = await requester(`/comments/${id}/comments`, { text: text }, 'POST')

  return response.data
}

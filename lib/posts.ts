import requester from './requester'

const transformComments = (comments) => {
  return comments.map((comment) => {
    return {
      id: comment.id,
      author: comment.author.email,
      text: comment.text,
      voted: comment.voted,
      commentsCount: comment.comments_count || 0,
      date: Date.parse(comment.created_at) || 0,
      comments: transformComments(comment.comments)
    }
  })
}

const transform = (val) => {
  if (val) {
    return {
      id: val.id,
      url: val.url || '',
      author: val.author.email,
      date: Date.parse(val.created_at) || 0,
      comments: val.comments ? transformComments(val.comments) : [],
      commentsCount: val.comments_count || 0,
      weight: Math.floor(val.weight),
      title: val.title,
      voted: val.voted || false
    }
  } else {
    return null
  }
}

export const getAll = async (page = 1, limit = 10) => {
  const response = await requester('/posts', { page: page, per_page: limit })
  const summary = response.data
  const posts = summary.posts.map((post) => transform(post))

  return { ...summary, posts: posts }
}

export const get = async (id: number) => {
  const response = await requester(`/posts/${id}`)

  return transform(response.data)
}

export const create = async (title: string, url: string) => {
  const response = await requester('/posts', { title: title, url: url }, 'POST')

  return response.data
}

export const vote = async (id: number) => {
  const response = await requester(`/posts/${id}/votes`, {}, 'POST')

  return response.data
}

export const addComment = async (id: number, text: string) => {
  const response = await requester(`/posts/${id}/comments`, { text: text }, 'POST')

  return response.data
}

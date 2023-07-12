import Link from 'next/link'
import Story from './story'
import { getAll } from '../lib/posts'
import styles from './stories.module.css'

async function StoryWithData({ data }) {
  return data.map ((post) => {
    return (
      <div key={post.id} className={styles.item}>
        <Story {...post} />
      </div>
    )
  })
}

export default async function Stories({ page = 1 }) {
  const limit = 10
  const summary = await getAll(page, limit)

  return (
    <div>
      <StoryWithData data={summary.posts} />

      <div className={styles.footer}>
        { 
          summary.current_page > 1 && 
            <Link href={`/news/${summary.current_page - 1}`}>{'<'} Prev</Link>
        } 
        <span> {summary.current_page} </span>
        { 
          summary.current_page < summary.total_pages && 
            <Link href={`/news/${summary.current_page + 1}`}>Next {'>'}</Link>
        }
      </div>
    </div>
  )
}

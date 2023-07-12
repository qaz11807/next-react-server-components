import { notFound } from 'next/navigation'
import Story from 'components/story';
import Comment from 'components/comment';
import styles from './page.module.css';
import { get } from 'lib/posts'

export default async function ItemPage({ params, children }) {
  const { id } = params
  if (!id) {
    notFound()
  }
  const story = await get(id)
  if (!story) {
    notFound()
  }
  const options = { withComments: true }

  return (
    <div className={styles.item}>
      <Story {...{ ...story, ...options}} />
      {
        story?.comments.map((comment)=>{
          return (
            <Comment {...comment}/>
          )
        })
      }
    </div>
  );
}

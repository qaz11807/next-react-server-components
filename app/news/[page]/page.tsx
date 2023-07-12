import Stories from 'components/stories'

export const dynamicParams = true;

export default async function RSCPage({ params }) {
  const { page } = params
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Stories page={page} />
    </>
  )
}

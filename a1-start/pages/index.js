import Head from 'next/head'
import Link from 'next/link'
import { getSlugs, getPosts } from '../lib/posts'

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: { posts },
  }
}

// props 接收 getStaticProps 傳遞過來的值
export default function Home({ posts }) {
  // console.log('[Home] render: ', posts)
  return (
    <>
      <Head>
        <title>My blog</title>
        <meta name="description" value="This is my blog" />
      </Head>
      <main>
        <h1>My blog</h1>
      </main>
      <nav>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

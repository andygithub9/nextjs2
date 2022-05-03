import Head from 'next/head'
import { getPost, getSlugs } from '../../lib/posts'

export async function getStaticPaths() {
  // 自動獲取 content/posts 下的 .md 文件
  const slugs = await getSlugs()

  // 定義動態路由的有效路徑
  return {
    // paths: [
    //   // { params: { 文件名中中括號的名稱: '有效路徑' } },
    //   { params: { slug: 'first-post' } },
    //   { params: { slug: 'second-post' } },
    // ],

    // 通過 Array.map 映射成 paths 需要的格式
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false, // 如果不匹配以上路徑則返回 404
  }
}

// 從 context 拿到瀏覽器傳遞 給 getStaticPaths 的路徑
// 通過 { params: { slug } } 解構拿到瀏覽器路徑 slug 的值
export async function getStaticProps({ params: { slug } }) {
  // console.log('[FirstPostPage] getStaticProps()', slug)
  const post = await getPost(slug)
  return {
    props: {
      post,
    },
  }
}

export default function PostPage({ post }) {
  // console.log('[PostPage] render', post)
  return (
    <>
      <Head>
        <title>{post.title} - my blog</title>
      </Head>
      <main>
        <p>{post.date}</p>
        <h1>{post.title}</h1>

        {/* 要在 react 使用 innerHTML 必須要用 dangerouslySetInnerHTML={{ __html: html 語法 }} */}
        <article dangerouslySetInnerHTML={{ __html: post.body }} />
      </main>
    </>
  )
}

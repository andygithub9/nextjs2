// https://stackoverflow.com/questions/67478532/module-not-found-cant-resolve-fs-nextjs/67478653#67478653
// 要引入 nodejs 的模塊必須配置 next.config.js
import { readdir, readFile } from 'fs/promises'

import matter from 'gray-matter'

// 將 markdown 轉成 html 的 lib
import { marked } from 'marked'

// slug 通常表示是 URL 的一部份
export async function getPost(slug) {
  const source = await readFile(`content/posts/${slug}.md`, 'utf-8')

  // 通過 gray-matter 提取出 Front-matter 和 content(正文)
  const {
    data: { date, title },
    content,
  } = matter(source)

  // 通過 marked 庫將 md 轉換成 html
  const body = marked(content)

  return {
    date,
    title,
    body,
  }
}

// 自動獲取 content/posts 下的 .md 文件的文件名
export async function getSlugs() {
  const subffix = '.md'
  const files = await readdir('content/posts')
  return files
    .filter((file) => file.endsWith(subffix))
    .map((file) => file.slice(0, -subffix.length))
}

//
export async function getPosts() {
  const slugs = await getSlugs()
  const posts = []
  for (const slug of slugs) {
    const post = await getPost(slug)
    posts.push({ slug, ...post })
  }
  return posts
}

// Option 1b : fetch  products on  the server side
// but with Incremental Static Regeneration (ISR) (in getStaticProps)
// Incremental Static Regeneration 簡稱為 ISR ，在 getStaticProps 返回的對象中添加 revalidate 屬性，
// revalidate 的值為一個整數代表秒數，每相隔 revalidate 的秒數後在有 ISR 的頁面重新刷新，
// 則 next.js 會自動執行 getStaticProps 獲取新的數據。
// 這樣做的好處是頁面依然是靜態 HTML ，但也會定期重新生成新的 HTML。
import Head from 'next/head'
import Title from '../components/Title'
import { getProducts } from '../lib/products'

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()')
  const products = await getProducts()
  return { props: { products }, revalidate: 15 /* second */ }
}

export default function Home({ products }) {
  console.log('[HomePage] render: ', products)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

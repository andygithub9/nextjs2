// Option 1c : fetch  products on  the server side (in getServerSideProps)
// 使用 getServerSideProps 的頁面是服務器端渲染的動態頁面，
// 每次刷新頁面都會對後端發送請求
import Head from 'next/head'
import Title from '../components/Title'
import { getProducts } from '../lib/products'

export async function getServerSideProps() {
  console.log('[HomePage] getStaticProps()')
  const products = await getProducts()
  return { props: { products } }
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

// Option 1b : fetch  products on  the server side
// but with Incremental Static Regeneration (ISR) (in getStaticProps)
// Incremental Static Regeneration 簡稱為 ISR ，在 getStaticProps 返回的對象中添加 revalidate 屬性，
// revalidate 的值為一個整數代表秒數，每相隔 revalidate 的秒數後在有 ISR 的頁面重新刷新，
// 則 next.js 會自動執行 getStaticProps 獲取新的數據。
// 這樣做的好處是頁面依然是靜態 HTML ，但也會定期重新生成新的 HTML。
import { getProducts } from '../lib/products'

import ProductCard from '../components/ProductCard'
import Page from '../components/Page'

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()')
  const products = await getProducts()
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS) /* second */,
  }
}

export default function Home({ products }) {
  console.log('[HomePage] render: ', products)
  return (
    <>
      <Page title="Indoor Plants">
        <main className="px-6 py-4">
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </main>
      </Page>
    </>
  )
}

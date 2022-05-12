import Head from 'next/head'
import Title from '../../components/Title'
import { getProducts, getProduct } from '../../lib/products'
import { ApiError } from '../../lib/api'

// 定義路由
export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    // 使用 ISR 時，需要將 fallback 設置為 blocking 等待 next.js 映射後端數據生成新頁面後 response 給客戶端，
    // 如果 fallback 設置為 false 則 next.js 不會映射後端直接將客戶端導到 404 page
    fallback: 'blocking',
  }
}

// 參數接收 getStaticPath 傳遞的值
export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id)
    return {
      props: { product },
      revalidate: 15,
    }
  } catch (error) {
    console.error('error.status: ', error.status)

    // 如果 id 找不到就捕獲 getProduct 拋出的錯誤
    // 如果 error.status 是 404 則將頁面導向 404 頁面
    // notFound 是特殊的 flag 會將頁面導向 404 頁面
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true }
    }

    // 如果不是 404 錯誤則直接拋出錯誤
    throw error
  }
}

function ProductPage({ product }) {
  console.log('[ProductPage] render: ', product)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  )
}
export default ProductPage

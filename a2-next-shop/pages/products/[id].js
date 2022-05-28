import Image from 'next/image'
import Page from '../../components/Page'
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
  // console.log('[ProductPage] render: ', product)
  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="" width={640} height={480} />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
        </div>
      </div>
    </Page>
  )
}
export default ProductPage

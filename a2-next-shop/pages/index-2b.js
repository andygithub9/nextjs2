// Option 2b: fetch products on the client side (in useEffect)
// from an internal API route
// 經過內部 api 路由代理可以減少不必要的數據傳輸
// 以此為例 /api/products 幫我們過濾掉了 id 和 title 以外的數據
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Title from '../components/Title'

export default function Home() {
  // products 的初始化值為 []
  const [products, setProducts] = useState([])
  console.log(setProducts)
  useEffect(() => {
    // useEffect 中不能用 async function 作為回調函數，所以改用異步的 IIFE
    ; (async () => {
      const response = await fetch('/api/products')
      const products = await response.json(response)
      setProducts(products)
    })()
  }, [])
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

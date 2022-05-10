// Option 2a: fetch products on the client side (in useEffect)
// directly from an external API
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Title from '../components/Title'
import { getProducts } from '../lib/products'

export default function Home() {
  // products 的初始化值為 []
  const [products, setProducts] = useState([])
  console.log(setProducts)
  useEffect(() => {
    getProducts().then(
      // (products) => setProducts(products),
      // 可以簡寫成下面
      setProducts,
    )
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

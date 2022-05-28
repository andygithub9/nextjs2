import Link from 'next/link'
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <>
      {/* w-80 calss 在 tailwind 表示 320 px 寬度 */}
      <div className="border w-80 shadow hover:shadow-xl">
        <Link href={`/products/${product.id}`}>
          <a>
            <Image src={product.pictureUrl} width={320} height={240} />
            <div className="p-2 flex justify-between items-baseline">
              <h2 className="text-lg font-bold">{product.title}</h2>
              <span>{product.price}</span>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default ProductCard

import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>about</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            display: inline;
          }

          li:not(:first-child) {
            margin-left: 1rem;
          }
        `}
      </style>
    </>
  )
}

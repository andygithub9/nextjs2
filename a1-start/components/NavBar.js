import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

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
        <ThemeSwitch />
      </nav>
      <style jsx>
        {`
          nav {
            display: flex;
            justify-content: space-between;
          }
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

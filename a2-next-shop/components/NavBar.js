import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchJson } from '../lib/api'

function Navbar() {
  const [user, setUser] = useState()
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson('/api/user')
        // https://stackoverflow.com/questions/33117449/invariant-violation-objects-are-not-valid-as-a-react-child
        // 這邊把 user 設置成對象時記得在 jsx 不能直接使用 user ，否則會報錯 Error: Objects are not valid as a React child
        // 在 react 返回的 jsx 對象中的 {} 中不能有對象，所以在下面改成 user.name
        setUser(user)
        console.log(user);
      } catch (error) {
        // not sign in
      }
    })()
  }, [])

  // 因為 cookie 設置了 httpOnly 所以只有服務器端可以訪問此 cookie
  // 所以必須通過請求 api 從服務器端刪除 cookie
  const handleSignOut = async () => {
    await fetchJson('/api/logout')
    setUser(undefined)
  }

  return (
    <nav className='px-2 py-1 text-sm'>
      <ul className='flex gap-2'>
        <li className='text-lg font-extrabold'>
          <Link href='/'>
            <a>
              Next Shop
            </a>
          </Link>
        </li>

        {/* class 設置 flex-1 讓他暫用剩餘空間，分開上下的 li */}
        {/* role 設置 separator 實現可訪問性 */}
        <li role="separator" className='flex-1' />

        {user?.name ? (
          <>
            <li>
              {user.name}
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          < li >
            <Link href='/sign-in'>
              <a>
                Sign in
              </a>
            </Link>
          </li>
        )
        }

      </ul>
    </nav >
  )
}
export default Navbar
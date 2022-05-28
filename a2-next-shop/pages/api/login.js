import cookie from "cookie";
import { fetchJson } from '../../lib/api'

const { CMS_URL } = process.env

async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    // http response code 405 means Method Not Allowed
    res.status(405).end()
    return
  }
  const { email, password } = req.body
  try {
    const { jwt, user: { id, username: name } } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: 'POSt',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password: password })
    })

    res.status(200)
      .setHeader('Set-Cookie',
        // cookie 的字符串有指定格式，我們可以使用 cookie library 序列化 cookie 產生正確的 cookie 格式
        cookie.serialize('jwt', jwt, {
          path: '/api', // 將 cookie 限制在網域下的 /api 中才可以使用
          httpOnly: true, // 這告訴瀏覽器 cookie 只能做為向服務器發送請求時的請求頭，無法在客戶端的 JS 訪問此 cookie
          // expires: 'Thu, 18 Dec 2013 12:00:00 UTC' // cookie 可以設定一個到期期限，但是這邊先不設置將它做為一個 session cookie
          // cookie 會被記住直到用戶關閉瀏覽器
          // cookie 的日期設置可以參考: https://stackoverflow.com/questions/13154552/how-can-i-set-a-cookie-with-expire-time
        }))
      .json({
        id,
        name
      })
  } catch (error) {
    // http response code 401 means Unauthorized
    res.status(401).end()
  }

}
export default handleLogin
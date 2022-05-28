import cookie from "cookie"

function handleLogout(req, res) {
  res.status(200)
    .setHeader('Set-Cookie', cookie.serialize('jwt', '',
      {
        path: '/api',
        expires: new Date(0) // 將 expires 設置為過去的時間表示要刪除此 cookie
      }
    ))
    .json({})
}

export default handleLogout
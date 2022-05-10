export function ApiError(url, status) {
  this.name = 'ApiError'
  this.status = status
  this.url = url
  this.stack = new Error().stack
}
ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

export async function fetchJson(url) {
  const response = await fetch(url)
  // getProduct(id) 如果 fetch 的 id 不存在則不會返回 JSON 而是純文本的 404 錯誤
  // 所以這邊要做拋出錯誤，否則會報 JSON 解析錯誤，而不是找不到頁面 404 錯誤
  if (!response.ok) {
    throw new ApiError(url, response.status)
  }
  return await response.json()
}

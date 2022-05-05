import { useState, useEffect } from 'react'
import DarkTheme from './DarkTheme'

// localStorage 只在瀏覽器運行時存在，不會在 nodejs 運行時存在，
// 也就是 server 端的 localStorage 是 undefined ，
// 所以只能用 React 的 hooks 操作 localStorage ，因為 React 只在瀏覽器端執行
// https://codesandbox.io/s/z20gn?file=/pages/index.js
function useLoadDarkMode(defaultValue, key) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const storageValue = window.localStorage.getItem(key)

    // 如果 localStorage 有值則將狀態設為 localStorage 的值
    if (storageValue !== null) {
      setValue(JSON.parse(storageValue))
    }
  }, [key])

  useEffect(() => {
    // 設定 localStorage 的 key value，如果偵測到 value 的狀態改變就在設定一次 localStorage 的 key value
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

function ThemeSwitch() {
  const [darkMode, setDarkMode] = useLoadDarkMode(false, 'darkMode')

  const handleClick = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
    setDarkMode = setDarkMode(!darkMode)
  }

  console.log('[ThemeSwitch] darkmode: ', darkMode)
  const text = darkMode ? 'Light Mode' : 'Dark Mode'

  return (
    <>
      <button onClick={handleClick}>{text}</button>
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            cursor: pointer;
            color: inherit; /* 繼承父層的顏色 */
          }
        `}
      </style>
      {darkMode && <DarkTheme />}
    </>
  )
}
export default ThemeSwitch

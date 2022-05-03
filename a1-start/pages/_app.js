import Navbar from '../components/NavBar'
import '../styles/globals.css'

// Component 表示 page 目錄下面的組件，pageProps 表示傳給該 page 組件的 props
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

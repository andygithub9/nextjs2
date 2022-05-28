import { useRouter } from "next/router";
import { useState } from "react";
import Filed from "../components/Filed";
import Input from "../components/Input";
import Page from "../components/Page";
import Button from "../components/Button";
import { fetchJson } from "../lib/api";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function SingInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: false })
    await sleep(500)

    // // 這段代碼在客戶端運行，但是默認情況下環境變量只在服務器端可見
    // console.log('process.env.CMS_URL', process.env.CMS_URL); // undefined
    // // next.js 提供了一種方法使環境變量可用在客戶端
    // // 在 .env 或是 .env.local 定義環境變量前加上 NEXT_PUBLIC 前綴，例如: NEXT_PUBLIC_CMS_URL
    // console.log('process.env.NEXT_PUBLIC_CMS_URL', process.env.NEXT_PUBLIC_CMS_URL); // http://localhost:1337

    try {
      const response = await fetchJson('/api/login', {
        method: 'POSt',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      setStatus({ loading: false, error: false })
      console.log('sign in: ', response);
      router.push('/')
    } catch (error) {
      setStatus({ loading: false, error: true })
    }

  }

  return (
    <Page title="Sing In">
      <form onSubmit={handleSubit}>
        <Filed lable="Email">
          <Input type="email" required value={email} onChange={event => setEmail(event.target.value)} />
        </Filed>
        <Filed lable="Password">
          <Input type="password" required value={password} onChange={event => setPassword(event.target.value)} />
        </Filed>
        {
          status.error && (
            <p className="text-red-700">
              Invalid credentials
            </p>
          )
        }
        {
          status.loading ? (
            <p>Loading...</p>
          ) : (
            <Button type="submit">
              Sing in
            </Button>
          )
        }

      </form>
    </Page>
  )
}
export default SingInPage
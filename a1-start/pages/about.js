import Head from 'next/head'

export default function About() {
  console.log('[About] render')
  return (
    <>
      <Head>
        <title>About - my blog</title>
      </Head>
      <main>
        <h1>about</h1>
      </main>
    </>
  )
}

import Head from 'next/head'
import Container from '../components/Container'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram v1</title>
        <meta name="description" content="Instagram Clone" />
      </Head>
      <Container />
    </div>
  )
}

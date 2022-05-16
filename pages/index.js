// NEED TO TEST OUT FIREBASE FUNCTIONALITY SO REMOVING THE NEXT_AUTH SIGNIN FOR A SIMPLE EMAIL SIGNIN
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Container from '../components/Container'

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Gamer's LinkedIn</title>
        <meta name="description" content="LinkedIn for Gamers" />
      </Head>
      <Container />
    </div>
  )
}

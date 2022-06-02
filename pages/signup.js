import Head from 'next/head'
import SignUp from '../components/SignUp'

export default function SignupPage() {
  return (
    <div>
      <Head>
        <title>Gamer's LinkedIn</title>
        <meta name="description" content="LinkedIn for Gamers" />
      </Head>
      <SignUp />
    </div>
  )
}

import { Center } from '@mantine/core'
import Head from 'next/head'
import SignIn from '../components/SignIn'

export default function SigninPage() {
    return (
        <div>
            <Head>
                <title>Gamer's LinkedIn</title>
                <meta name="description" content="LinkedIn for Gamers" />
            </Head>
            <SignIn />
        </div>
    )
}

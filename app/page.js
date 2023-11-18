import Image from 'next/image'
import GetStarted from './components/GetStarted.jsx'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="h-full w-full ">
      <div>
      <Link href="/login">
          <button className="btn-primary">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn-primary">Register</button>
        </Link>

      </div>
    </main>
  )
}

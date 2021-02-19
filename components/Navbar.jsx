import Link from 'next/Link'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/subscription">Subscription</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

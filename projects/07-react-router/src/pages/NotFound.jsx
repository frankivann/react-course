import { Link } from '../components/Link'

export default function NotFound () {
  return (
    <>
      <div>
        <h1>This is NOT Fine my G!</h1>
        <img src='https://midu.dev/images/this-is-fine-404.gif' alt='This is not fine dog gif' />
      </div>

      <Link to='/'>Go to Home</Link>
    </>
  )
}

import { Link } from 'react-router-dom'

const BackToHome = () => {
  return (
    <div>
      <Link to='/'><button className='text-md text-blue-300 absolute right-5 top-2 hover:font-semibold'>&larr; Home</button></Link>
    </div>
  )
}

export default BackToHome
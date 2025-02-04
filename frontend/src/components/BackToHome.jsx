import { Link } from 'react-router-dom'

const BackToHome = () => {
  return (
    <div>
      <Link to='/'><button className='text-md text-blue-700 px-6 py-2 absolute bottom-3 md:bottom-1 left-1/3 md:left-0  hover:font-semibold'>&larr; Home</button></Link>
    </div>
  )
}

export default BackToHome
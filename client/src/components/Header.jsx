import {Link} from 'react-router-dom'
import logo from '../assets/logo2.png'
import {useSelector} from 'react-redux'

function Header() {
    const currentUser = useSelector((state) => state.user.currentUser)
    // console.log(currentUser)
  return (
    <header className='bg-white font-normal shadow-sm'>
        <nav className='flex justify-between p-3 items-center max-w-3xl mx-auto'>
            <Link to={'/'} className='flex items-center cursor-pointer'>
                <img src={logo} alt="logo" className="h-6 w-auto object-contain" />
            </Link>
            <ul className='flex gap-4'>
                <Link to={'/home'}>
                    <li className='py-2 hover:underline'>Home</li>
                </Link>
                <Link to={'/about'}>
                    <li className='py-2 hover:underline'>About</li>
                </Link>
                {currentUser ? (
                    <Link to={'/profile'}>
                        <li className='py-2 hover:underline'>
                            <img src={currentUser.avatar} alt="profile-picture" className="h-7 w-7 rounded-full object-cover " />
                        </li>
                    </Link>
                ) : 
                <Link to={'/'}>
                    <li className='px-2 py-2 bg-blue-600 text-white rounded-lg shadow-blue-200 shadow-lg'>Sign in</li>
                </Link>
                }
            </ul>
        </nav>
    </header>
  )
}

export default Header
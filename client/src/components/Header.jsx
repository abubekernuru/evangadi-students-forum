import {Link} from 'react-router-dom'
import logo from '../assets/logo2.png'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/userSlice'

function Header() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const baseURL = import.meta.env.VITE_API_BASE_URL || '';
        const handleSignout = async ()=>{
            try {
                const res = await fetch(`${baseURL}/api/auth/signout`);
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message || "Signout failed");
                    return;
                }
                dispatch(signOutSuccess());
            } catch (error) {
                console.log(error)
            }
        }
  return (
    <header className='bg-white font-normal shadow-sm'>
        <nav className='flex justify-between p-3 items-center max-w-3xl mx-auto'>
            <Link to={'/'} className='flex items-center cursor-pointer'>
                <img src={logo} alt="logo" className="h-6 w-auto object-contain" />
            </Link>
            <ul className='flex gap-4'>
                <Link to={'/'}>
                    <li className='py-2 hover:underline'>Home</li>
                </Link>
                {currentUser && (
                    <div onClick={handleSignout} className='py-2'>
                        <li className='p-1 bg-blue-700 text-white rounded-md shadow-green-200 shadow-md hover:opacity-95 text-sm cursor-pointer'>Log out</li>
                    </div>
                )}
                {currentUser ? (
                    <Link to={'/profile'}>
                        <li className='py-2 hover:underline'>
                            <img src={currentUser.avatar} alt="profile-picture" className="h-7 w-7 rounded-full object-cover " />
                        </li>
                    </Link>
                ) : 
                <Link to={'/signin'}>
                    <li className='px-2 py-2 bg-blue-600 text-white rounded-lg shadow-blue-200 shadow-lg hover:opacity-95'>Sign in</li>
                </Link>
                }
            </ul>
        </nav>
    </header>
  )
}

export default Header
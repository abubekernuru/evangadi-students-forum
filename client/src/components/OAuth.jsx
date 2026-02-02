import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice.js'
import {useNavigate} from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            // console.log(result.user)
            const res = await fetch(`${baseURL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: result.user.email,
                    firstName: result.user.displayName.split(" ")[0],
                    lastName: result.user.displayName.split(" ")[1],
                    name: result.user.displayName,
                    photoURL: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-green-600 py-3 text-white rounded-md font-semibold hover:opacity-90 transition-colors  text-center cursor-pointer'>
        Continue with Google
    </button>
  )
}

export default OAuth
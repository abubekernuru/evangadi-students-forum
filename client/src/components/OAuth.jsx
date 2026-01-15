import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice.js'

function OAuth() {
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            // console.log(result.user)
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.user)
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
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
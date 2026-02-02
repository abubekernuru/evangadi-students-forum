import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice';

function SignUp({switchToSignIn}) {
  const [formData, setFormData] = useState({
    email:'',
    firstName:'',
    lastName:'',
    username:'',
    password:''
  })

  const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}/api/auth/signup/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if(!res.ok){
        dispatch(signInFailure(data.message || "Signup failed"));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log(error)
      dispatch(signInFailure(error.message) || "Signup failed");
    }
  }
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  return (
    <div className='flex flex-col bg-white p-10 m-5 shadow-xl max-w-lg mx-auto rounded-lg'>      
      <h2 className='text-xl font-bold mb-2 text-center text-gray-800'>Join the network</h2>
      <p className='text-center text-sm text-gray-500 mb-6'>
        Already have an account? <span onClick={switchToSignIn} className='text-orange-500 hover:underline cursor-pointer' to={'/sign-in'}>Sign in</span>
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="email" 
          placeholder='Email' 
          id='email' 
          required
          onChange={(e)=>handleChange(e)}
        />
        {/* Name Fields Row */}
        <div className='flex gap-4'>
          <input 
            className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='First Name' 
            id='firstName' 
            required
            onChange={(e)=>handleChange(e)}
          />
          <input 
            className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='Last Name' 
            id='lastName'
            required
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="text" 
          placeholder='Username' 
          id='username' 
          required
          onChange={(e)=>handleChange(e)}
        />
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="password" 
          placeholder='Password' 
          id='password'
          required
          onChange={(e)=>handleChange(e)}
        />

        {/* Submit Button */}
        <button type='submit' className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:opacity-95 transition-colors mt-2 text-centern cursor-pointer'>
          {loading ? "loading..." : "Agree and Join"}
        </button>
        <OAuth />
        {error && <p className='text-red-500 text-sm text-center mt-2'>
          {error}
        </p>}
      </form>
      {/* Footer Links */}
      <div className='text-center mt-6 text-xs text-gray-500 leading-relaxed'>
        <p>
          I agree to the <Link className='text-orange-500 hover:underline' to='/'>privacy policy</Link> and <Link className='text-orange-500 hover:underline' to='/'>terms of service</Link>.
        </p>
        <span onClick={switchToSignIn} className='text-orange-400 block mt-2 hover:underline cursor-pointer' to={'/'}>
          Already have an account?
        </span>
      </div>
    </div>
  );
}

export default SignUp;
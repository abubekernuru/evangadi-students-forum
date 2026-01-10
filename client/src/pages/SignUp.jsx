import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({
    email:'',
    firstName:'',
    lastName:'',
    username:'',
    password:''
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('http://localhost:3000/api/auth/signup/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if(!res.ok){
        setError(data.message || "Something went wrong!")
        setLoading(false)
        return;
      }
      setLoading(false)
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  return (
    <div className='flex flex-col bg-white p-10 m-5 shadow-xl max-w-lg mx-auto rounded-lg'>      
      <h2 className='text-xl font-bold mb-2 text-center text-gray-800'>Join the network</h2>
      <p className='text-center text-sm text-gray-500 mb-6'>
        Already have an account? <Link className='text-orange-500 hover:underline' to={'/sign-in'}>Sign in</Link>
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
        {error && <p className='text-red-500 text-sm text-center mt-2'>
          {error}
        </p>}
      </form>
      {/* Footer Links */}
      <div className='text-center mt-6 text-xs text-gray-500 leading-relaxed'>
        <p>
          I agree to the <Link className='text-orange-500 hover:underline' to='/'>privacy policy</Link> and <Link className='text-orange-500 hover:underline' to='/'>terms of service</Link>.
        </p>
        <Link className='text-orange-400 block mt-2 hover:underline' to={'/'}>
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
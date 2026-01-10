import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/auth/signin/', {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        if(!res.ok){
          setLoading(false)
          setError(data.message)
          return
        }
        setLoading(false)
        navigate('/')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  return (
    <div className='flex flex-col bg-white p-10 m-5 shadow-xl max-w-lg mx-auto rounded-lg'>      
      <h2 className='text-xl font-bold mb-2 text-center text-gray-800'>Login to your account</h2>
      <p className='text-center text-sm text-gray-500 mb-6'>
        Do not have an account? <Link className='text-orange-400 hover:underline ' to={'/sign-up'}>Create a new account</Link>
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
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="password" 
          placeholder='Password' 
          id='password'
          required
          onChange={(e)=>handleChange(e)}
        />

        {/* Submit Button */}
        <button type='submit' className='bg-orange-400 text-white py-3 rounded-md font-semibold hover:opacity-90 transition-colors mt-2 text-center cursor-pointer'>
          {loading ? "loading..." : "Submit"}
        </button>
        {error && <p className='text-red-500 text-sm text-center mt-2'>
          {error}
        </p>}
      </form>
      {/* Footer Links */}
      <div className='text-center mt-6 text-xs '>
          <Link className='text-orange-500 hover:underline' to='/'>Create an account?</Link> 
      </div>
    </div>
  )
}

export default SignIn
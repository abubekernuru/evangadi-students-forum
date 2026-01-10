import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='flex flex-col bg-white p-10 shadow-xl max-w-lg mx-auto rounded-lg'>      
      <h2 className='text-xl font-bold mb-2 text-center text-gray-800'>Join the network</h2>
      <p className='text-center text-sm text-gray-500 mb-6'>
        Already have an account? <Link className='text-orange-500 hover:underline' to={'/'}>Sign in</Link>
      </p>
      <form className='flex flex-col gap-4'>
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="email" 
          placeholder='Email' 
          id='email' 
        />
        {/* Name Fields Row */}
        <div className='flex gap-4'>
          <input 
            className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='First Name' 
            id='firstName' 
          />
          <input 
            className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='Last Name' 
            id='lastName' 
          />
        </div>
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="text" 
          placeholder='Username' 
          id='userName' 
        />
        <input 
          className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          type="password" 
          placeholder='Password' 
          id='password' 
        />

        {/* Submit Button */}
        <button className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors mt-2'>
          Agree and Join
        </button>
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
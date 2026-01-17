import {useRef} from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
    const {currentUser, loading, error} = useSelector((state)=>state.user);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e)=> {
    }
    const handleChange = (e)=>{
    }
return (
    <div className='flex flex-col bg-white p-10 m-5 shadow-xl max-w-lg mx-auto rounded-lg'>      
        <h2 className='text-xl font-bold mb-2 text-center text-gray-800'>Update Profile</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
            />
            <img
                src={currentUser.avatar} 
                alt="profile-picture" 
                className="h-20 w-20 rounded-full object-cover mx-auto cursor-pointer" 
                onClick={()=>fileInputRef.current.click()}
            />
            <input 
                className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="email" 
                placeholder='Email' 
                id='email' 
                required
                defaultValue={currentUser.email}
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
                defaultValue={currentUser.firstName}
                onChange={(e)=>handleChange(e)}
                />
                <input 
                className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="text" 
                placeholder='Last Name' 
                id='lastName'
                required
                defaultValue={currentUser.lastName}
                onChange={(e)=>handleChange(e)}
                />
            </div>
            <input 
                className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="text" 
                placeholder='Username' 
                id='username' 
                required
                defaultValue={currentUser.username}
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
            <button type='submit' className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:opacity-95 transition-colors mt-2 text-centern cursor-pointer'>
            {/* {loading ? "Updating..." : "Update"} */}
                Update
            </button>
            {error && <p className='text-red-500 text-sm text-center mt-2'>
                {error}
            </p>}
        </form>
    </div>
    );
}

export default Profile
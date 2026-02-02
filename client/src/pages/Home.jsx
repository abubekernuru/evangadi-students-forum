import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FaChevronRight } from "react-icons/fa";

function Home() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='flex flex-col gap-6 max-w-3xl mx-auto p-6'>
  {currentUser && (
    <div className='flex justify-between items-center bg-gray-50 p-3 rounded-lg border'>
      <div className='flex items-center gap-2'>
        <img src={currentUser.avatar} className='h-8 w-8 rounded-full' alt="profile" />
        <span className='font-semibold text-sm text-gray-700'>Welcome, {currentUser.username}</span>
      </div>
      <Link to={'/askquestion'} className='bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors'>
        Ask a Question
      </Link>
    </div>
  )}

  <div className="space-y-4">
    <h2 className='text-2xl font-bold text-gray-800 border-b pb-4'>Recent Questions</h2>

    <div className='flex gap-6 items-center p-4 border rounded-xl hover:shadow-md transition-shadow bg-white'>
      <div className='flex flex-col items-center min-w-[70px]'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="profile" 
            className='h-12 w-12 rounded-full ring-2 ring-blue-100 p-0.5' />
        <span className='text-[10px] mt-1 text-gray-500'>@username</span>
      </div>
      
      <Link to={`/question/123`} className='flex-1 flex justify-between gap-5 items-center group'>
        <p className='text-gray-700 font-medium group-hover:text-blue-600 transition-colors'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, rerum ea...
        </p>
        <FaChevronRight className="text-gray-300 group-hover:text-blue-500" />
      </Link>
    </div>
  </div>
</div>
  )
}

export default Home
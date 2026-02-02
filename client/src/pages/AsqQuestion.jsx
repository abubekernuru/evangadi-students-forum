import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function AsqQuestion() {
  const [formData, setFormData] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const {currentUser} = useSelector((state)=>state.user);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const res = await fetch(`${baseUrl}/api/question/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // added for deployment cors error
        body: JSON.stringify({ ...formData, userRef: currentUser._id })
      })
      const data = await res.json();
      if (data.success === false) {
        setFormError(data.message);
        setFormLoading(false);
      return;
    }
      navigate(`/qdetailanda/${data._id}`)
      setFormLoading(false);
    } catch (error) {
      // console.log(error)
      setFormError('An error occurred. Please try again.', error);
      setFormLoading(false);
    }
  }
  const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  // console.log(formData)
  return (
    <div className='flex flex-col md:flex-row gap-10 md:gap-20 px-5 md:px-20 py-10'>
      <div className='p-5 w-full'>
        <h1 className='font-extrabold text-gray-800 mb-6 text-3xl text-center'>Ask a public question</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1 '>
            <label htmlFor="questionTitle" className='font-semibold text-gray-700'>Title</label>
            <p className='text-xs text-gray-500 mb-1'>Be specific and imagine you’re asking a question to another person.</p>
            <input 
              type="text" 
              required
              className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' id='title' 
              placeholder='e.g. How do I use Redux Persist with cookies?'
              onChange={(e)=>handleChange(e)}
              />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="questionDetails" className='font-semibold text-gray-700'>Details </label>
            <p className='text-xs text-gray-500 mb-1'>Include all the information someone would need to answer your question.</p>
            <textarea 
              type="text" 
              id='content' 
              placeholder='Explain your problem here...' 
              rows={6} 
              required
              className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              onChange={(e)=>handleChange(e)}
              ></textarea>
          </div>
          <button type="submit" className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:opacity-95 transition-colors mt-2 text-center cursor-pointer'>{formLoading ? 'Posting...' : 'Post Your Question'}</button>
          {formError && <p className='text-red-500 text-sm mt-2'>{formError}</p>}
        </form>
      </div>
      <div className=' bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm m-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Tips for a great question</h2>
      <ul className='space-y-4 text-sm text-gray-700'>
        <li className='flex gap-2'>
          <span className='font-bold text-blue-600'>1.</span>
          <span>Search, and research to make sure your question hasn't been asked already.</span>
        </li>
        <li className='flex gap-2'>
          <span className='font-bold text-blue-600'>2.</span>
          <span>Be on-topic. Make sure your question is relevant to the community.</span>
        </li>
        <li className='flex gap-2'>
          <span className='font-bold text-blue-600'>3.</span>
          <span>Be specific and provide details to help others understand your question.</span>
        </li>
        <li className='flex gap-2'>
          <span className='font-bold text-blue-600'>4.</span>
          <span>Use proper grammar and spelling to make your question clear.</span>
        </li>
        <li className='flex gap-2'>
          <span className='font-bold text-blue-600'>5.</span>
          <span>Review your question before submitting to ensure it meets the guidelines.</span>
        </li>
      </ul>
      </div>
    </div>
  )
}

export default AsqQuestion
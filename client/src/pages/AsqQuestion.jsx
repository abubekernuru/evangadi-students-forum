import React from 'react'

function AsqQuestion() {
  return (
    <div className='flex flex-col md:flex-row gap-10 md:gap-20 px-5 md:px-20 py-10'>
      <div className='max-w-lg mx-auto p-5 w-full'>
        <h1 className='font-extrabold text-gray-800 mb-6 text-3xl text-center'>Ask Question</h1>
        <form className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1 '>
            <label htmlFor="questionTitle" className='font-semibold text-gray-700'>Title</label>
            <p className='text-xs text-gray-500 mb-1'>Be specific and imagine you’re asking a question to another person.</p>
            <input type="text" className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' id='questionTitle' placeholder='e.g. How do I use Redux Persist with cookies?'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="questionDetails" className='font-semibold text-gray-700'>Details </label>
            <p className='text-xs text-gray-500 mb-1'>Include all the information someone would need to answer your question.</p>
            <textarea type="text" id='questionDetails' placeholder='Explain your problem here...' rows={6} className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full'></textarea>
          </div>
          <button type="submit" className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:opacity-95 transition-colors mt-2 text-center cursor-pointer'>Submit Question</button>
        </form>
      </div>
      <div className='w-full '>
      <h2 className='text-center font-bold mb-3'>How to Ask Question</h2>
      <ul className='list-disc list-inside'>
        <li>Search, and research to make sure your question hasn't been asked already.</li>
        <li>Be on-topic. Make sure your question is relevant to the community.</li>
        <li>Be specific and provide details to help others understand your question.</li>
        <li>Use proper grammar and spelling to make your question clear.</li>
        <li>Review your question before submitting to ensure it meets the guidelines.</li>
      </ul>
      </div>
    </div>
  )
}

export default AsqQuestion
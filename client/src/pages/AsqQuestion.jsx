import React from 'react'

function AsqQuestion() {
  return (
    <div className='w-2xl mx-auto mt-5 p-5'>
      <h1 className='text-center font-bold mb-3'>Ask Question</h1>
      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2 p-3'>
          <label htmlFor="questionTitle">Enter your question title: </label>
          <input type="text" className='text-center' id='questionTitle' placeholder='Question title'/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="questionDetails">Enter your question details: </label>
          <textarea type="text" id='questionDetails' placeholder='Question details' rows={6} className='w-full'></textarea>
        </div>
        <button type="submit">Submit Question</button>
      </form>
    </div>
  )
}

export default AsqQuestion
import React from 'react'

function AsqQuestion() {
  return (
    <div className='container mt-5'>
      <h1 className='text-center font-bold mb-3'>Ask Question</h1>
      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="questionTitle">Enter your question title: </label>
          <input type="text" id='questionTitle' placeholder='Question title'/>
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
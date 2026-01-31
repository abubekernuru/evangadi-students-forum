import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function QdetailandA() {
  const [askerData, setAskerData] = useState(null);
  const [answerContent, setAnswerContent] = useState(null)
  const params = useParams();

  useEffect(()=>{
    const fetchQuestion = async () =>{
      try {
        const res = await fetch(`/api/question/${params.id}`);
        const data = await res.json();
        if(data.success === false){
          return
        }
        // console.log(data)
        setAskerData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestion();

    // const fetchAnswer = async () =>
    
  },[params.id])
  
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
      const res = await fetch(`/api/answer/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerContent)
      })
      const data = await res.json();
      if(data.success === false){
        return;
      }
      setAnswerContent( {content:""})
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(answerContent)
  const handleChange = (e)=>{
    setAnswerContent({...answerContent, content: e.target.value})
  }

  if (!askerData) return <div className='p-10 text-center'>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      
      {/* --- QUESTION SECTION --- */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          {askerData?.title}
        </h1>
        
        <div className="flex gap-6 items-start">
          {/* Author Sidebar */}
          <div className="flex flex-col items-center gap-1 min-w-20">
            <img 
              src={askerData?.userRef?.avatar} 
              alt="profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="text-xs font-medium text-blue-600">{askerData?.userRef?.username}</span>
          </div>

          {/* Question Body */}
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed text-lg">
              {askerData?.content}
            </p>
          </div>
        </div>
      </div>

      {/* --- ANSWERS LIST SECTION --- */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Community Answers
        </h2>
        
        {/* Mock Answer Item */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="text-gray-600">This is a sample answer. Once you have real data, you will .map() through them here!</p>
          <div className="flex justify-end mt-2 text-xs text-gray-400 italic">
            Answered by Sarah - 2 hours ago
          </div>
        </div>
      </div>

      {/* --- POST ANSWER SECTION --- */}
      <div className="bg-white border-t pt-8 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">Your Answer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea 
            placeholder="Write your solution here..." 
            rows={6}
            onChange={(e)=>handleChange(e)}
            value={answerContent?.content || ""}
            className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          ></textarea>
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-all self-start cursor-pointer"
          >
            Post Your Answer
          </button>
        </form>
        
        <div className="mt-4 text-sm">
          <span className="text-gray-500">Not what you're looking for? </span>
          <Link to="/askquestion" className="text-blue-600 hover:underline font-medium">
            Browse other questions or ask your own.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QdetailandA;
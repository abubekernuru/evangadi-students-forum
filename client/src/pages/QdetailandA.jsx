import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';


function QdetailandA() {
  const [askerData, setAskerData] = useState(null);
  const [postanswerContent, setpostAnswerContent] = useState(null)
  const [answerData, setAnswerData] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  const params = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(()=>{
    console.log('QdetailandA params:', params);
    if (!params.id) {
      console.warn('No params.id — skipping fetches');
      return;
    }
    const fetchQuestion = async () =>{
      try {
        const res = await fetch(`${baseUrl}/api/question/${params.id}`, { credentials: 'include' });
        const data = await res.json();
        if(data.success === false){
          return
        }
        setAskerData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestion();

    const fetchAnswer = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/answer/${params.id}`, { credentials: 'include' })
        const data = await res.json();
        if(data.success === false){
          return;
        }       
        // setAnswerData(data)
        if (Array.isArray(data)) {
          setAnswerData(data);
        } else {
          setAnswerData([]);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAnswer();
    
  },[params.id])
  
  const handleSubmit = async(e)=> {
    e.preventDefault();
    if (!params.id) {
      console.warn('Attempted to post answer without params.id');
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/answer/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // added for deployment cors error
        body: JSON.stringify(postanswerContent)
      })
      const data = await res.json();
      if(data.success === false){
        return;
      }
      const postWithUserInfo = {
        ...data,
        userRef: {
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      }
      setAnswerData([...answerData, postWithUserInfo])
      setpostAnswerContent( {content:""})
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(postanswerContent)
  const handleChange = (e)=>{
    setpostAnswerContent({...postanswerContent, content: e.target.value})
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
        {answerData?.length === 0 ?
          <p className="text-gray-500 italic">Be the first to answer this question!</p> : answerData.map((answer)=>(
          <div key={answer._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex gap-6">
            <div className='flex flex-col justify-center items-center'>
              <img src={answer.userRef?.avatar} alt="profile"
                className='w-8 h-8 rounded-full object-cover border border-blue-400'
              />
              <span className='text-xs text-gray-500 text-center'>{answer.userRef?.username}</span>
            </div>
            <div className='flex-1'>
          <p className="text-gray-600">{answer.content}</p>
          <div className="flex justify-end mt-2 text-xs text-gray-400 italic">
            {` ${new Date(answer.createdAt).toLocaleString()}`}
          </div>
            </div>
        </div>))}
      </div>

      {/* --- POST ANSWER SECTION --- */}
      {currentUser?<div className="bg-white border-t pt-8 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">Your Answer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea 
            placeholder="Write your solution here..." 
            rows={6}
            onChange={(e)=>handleChange(e)}
            value={postanswerContent?.content || ""}
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
      </div>:
        <div className='text-lg '>
          Have the answer? <Link className='text-green-700' to={'/signin'}>Log In</Link> to help your community.
        </div>
      }
    </div>
  );
}

export default QdetailandA;
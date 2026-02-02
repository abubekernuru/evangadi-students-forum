import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

function Landing() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2">
        {isLogin
          ?
          <SignIn switchToSignUp={()=>setIsLogin(false)}/>
          :
          <SignUp switchToSignIn={()=>setIsLogin(true)}/>
        }
      </div>
      {/* About section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 pt-10 mt-5">
          <h5 className="text-orange-500 font-semibold uppercase tracking-wide">About</h5>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Evangadi Networks Q&A
          </h1>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
            </p>
            <p>
              Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
            </p>
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-md w-fit font-semibold hover:bg-orange-600 transition">
            HOW IT WORKS
          </button>
        </div>
    </section>
  )
}

export default Landing

// import { useState } from 'react';
// import SignUp from './SignUp';
// import SignIn from './SignIn';

// function Landing() {
//   // true = show Login, false = show Register
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-10 items-center">
      
//       {/* COLUMN 1: The Switching Form */}
//       <div className="w-full md:w-1/2">
//         {isLogin ? (
//           <SignIn switchToSignUp={() => setIsLogin(false)} />
//         ) : (
//           <SignUp switchToSignIn={() => setIsLogin(true)} />
//         )}
//       </div>

//       {/* COLUMN 2: The Static About Text */}
//       <div className="w-full md:w-1/2 flex flex-col gap-6">
//         <h5 className="text-orange-500 font-semibold uppercase tracking-wide">About</h5>
//         <h1 className="text-4xl font-bold text-gray-800 leading-tight">
//           Evangadi Networks Q&A
//         </h1>
//         <div className="text-gray-600 space-y-4 leading-relaxed">
//           <p>
//             No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
//           </p>
//           <p>
//             Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
//           </p>
//         </div>
//         <button className="bg-orange-500 text-white px-8 py-3 rounded-md w-fit font-semibold hover:bg-orange-600 transition">
//           HOW IT WORKS
//         </button>
//       </div>
      
//     </section>
//   );
// }

// export default Landing;
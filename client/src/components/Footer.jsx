import darkLogo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { AiFillFacebook,AiFillLinkedin, AiFillGithub } from "react-icons/ai"; 

function Footer() {
  return (
    <footer className='bg-[#3b455a] text-gray-300 p-10'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center'>
        
        <div className='flex-1'>
        <img src={darkLogo} className='w-40 mb-6' alt="logo" />
        </div>
        <div className='flex-1 font-semibold md:text-center text-sm pb-5'>
            Developed by <Link target="_blank" className='hover:underline' to={"https://www.linkedin.com/in/abubeker-nuru-861815251/"}>Abubeker</Link> for Evangadi Students
        </div>
        <div className='flex-1 '>
            <div className='flex gap-4 text-3xl md:justify-end pb-5'>
                <Link to={'#'} className='hover:text-white transition'><AiFillFacebook /></Link>
                <Link target="_blank" to={'https://www.linkedin.com/in/abubeker-nuru-861815251/'} className='hover:text-white transition'><AiFillLinkedin /></Link>
                <Link target="_blank" to={'https://github.com/abubekernuru'} className='hover:text-white transition'><AiFillGithub /></Link>
            </div>
        </div>

    </div>
    </footer>
  )
}

export default Footer;
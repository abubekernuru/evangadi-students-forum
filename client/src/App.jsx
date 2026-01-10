import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import QdetailandA from './pages/QdetailandA.jsx'
import SignUp from './pages/SignUp.jsx'
import Landing from './pages/Landing.jsx'
import AsqQuestion from './pages/AsqQuestion.jsx'
import About from './pages/About.jsx'
import Header from './components/Header.jsx'
import SignIn from './pages/SignIn.jsx'
import Footer from './components/Footer.jsx'
function App() {

  return (
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/askquestion' element={<AsqQuestion />}></Route>
      <Route path='/qdetailanda' element={<QdetailandA />}></Route>
      <Route path='/about' element={<About />}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App

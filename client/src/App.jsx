import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import QdetailandA from './pages/QdetailandA.jsx'
import Landing from './pages/Landing.jsx'
import AsqQuestion from './pages/AsqQuestion.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Profile from './pages/Profile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
function App() {

  return (
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path='/signin' element={<Landing />}></Route>
      <Route path='/' element={<Home />}></Route>
        <Route path='/qdetailanda/:id' element={<QdetailandA />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/askquestion' element={<AsqQuestion />}></Route>
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App

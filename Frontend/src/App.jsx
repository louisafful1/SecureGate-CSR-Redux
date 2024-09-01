import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import LandingPage from './pages/landingPage/LandingPage'

function App() {
  return (
<Router>
  <Routes>
  <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element = {<Login />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
  </Routes>
</Router>
  )
}

export default App

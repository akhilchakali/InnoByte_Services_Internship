
import {Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import Loginpage from "./login_page"
import UserRegister from './register_page'
import Home from './home'

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route   path="/login" element={<Loginpage/>}/>
    <Route exatc path="/userregister" element={<UserRegister/>}/>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route exact  path='/home' element={<Home/>}/>
  </Routes>
  </BrowserRouter>
)
 

export default App
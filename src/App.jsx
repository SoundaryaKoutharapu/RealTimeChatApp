import Rooms from './pages/Rooms'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Rooms />}> </Route>
          </Route>
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App

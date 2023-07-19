import './App.css'
import Rooms from './pages/Rooms'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/' element={<Rooms />}> </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

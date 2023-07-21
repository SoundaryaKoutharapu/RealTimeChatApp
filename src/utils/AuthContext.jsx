import { useEffect, useState, createContext, useContext } from "react"
import { Account } from "appwrite"
import { account } from "../appWriteConfig"
import { useNavigate } from "react-router-dom" 

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()

  // true
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(null)


  useEffect (() => {
    setLoading(false)
  }, [])


const handleUserLogin = async (e, credentials) =>
{
    e.preventDefault()

    try {

      const response = await account.createEmailSession(credentials.email, credentials.password)
      console.log('logged in', response);
      const promise = account.get();
      setUser(accountDetails)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
}

  const contextData =
  {
    user,
    handleUserLogin,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  { return useContext(AuthContext) }
}

export default AuthContext
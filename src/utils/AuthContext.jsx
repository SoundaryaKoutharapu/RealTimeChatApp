import { useEffect, useState, createContext, useContext } from "react"
import { Account } from "appwrite"
import { account } from "../appWriteConfig"
import { useNavigate } from "react-router-dom" 

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()


  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect (() => {
    setLoading(false)
    getUserOnLoad()
  }, [])


const getUserOnLoad = async  () =>
{
  try {
    const accountDetails = await account.get();
    console.log('account details:' , accountDetails);
    setUser(accountDetails);  
  } catch (error) {
    console.infon(error);
  }
  setLoading(false)
}



const handleUserLogin = async (e, credentials) =>
{
    e.preventDefault()

    try {

      const response = await account.createEmailSession(credentials.email, credentials.password)
      console.log('logged in', response);
      const accountDetails = account.get();
      setUser(accountDetails)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
}


const handleUserLogOut = async () =>
{
  await account.deleteSession('current')
  setUser(null)
}

const  handleUserRegister = async () =>
{

}


  const contextData =
  {
    user,
    handleUserLogin,
    handleUserLogOut,
    handleUserRegister
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
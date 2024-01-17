import { createContext, useState, useEffect, useContext } from "react";
import { account} from "../config/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext({});

export const AuthProvider = ({ children}) => {

    const [user, setUser] = useState(false);
    // const user = true
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])


    const getUserOnLoad = async () => {
        try{
            let accountDetails = await account.get();
            setUser(accountDetails)
        }catch(error){
            
        }
        setLoading(false)
    }


    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        console.log('CREDS:', credentials)

        try{
            let response = await account.createEmailSession(credentials.email, credentials.password)
            let accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }


    const handleLogout = async () => {
        const response = await account.deleteSession('current');
        setUser(null)
    }


    const handleRegister = async (e, credentials) => {
        e.preventDefault()
        console.log('Handle Register triggered!', credentials)

        if(credentials.password1 !== credentials.password2){
            alert('Passwords did not match!')
            return 
        }

        try{
            
            let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
            console.log('User registered!', response)

            await account.createEmailSession(credentials.email, credentials.password1)
            let accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }


    const contextData = {
        user: user,
        handleUserLogin: handleUserLogin,
        handleLogout: handleLogout,
        handleRegister: handleRegister
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
}

export const useAuth = ()=> {return useContext(AuthContext)}
export default AuthContext;
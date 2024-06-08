import { useContext,createContext ,useState} from "react";
import Axios from 'axios'

const UserContext=createContext()

export const UserContextProvider=({children})=>{
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState({})

    const getUser = async () => {
        var response = localStorage.getItem("token") ? true : false;
        if (response) {
            await Axios.get("https://fstask-backend.vercel.app/get/user", { headers: { "Authorization": localStorage.getItem("token") } }).then(
                (res) => {
                    response = res.data
                }
            ).catch((err) => {
                response = false
            })
        }
        return response
    };
    const handleLogout=()=>{
        setLoggedIn(false)
        localStorage.removeItem('token')
    }

    return (
        <UserContext.Provider value={{handleLogout,user,setUser,getUser,isLoggedIn,setLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export function useMyOwnContext() {
    const UserContextValue = useContext(UserContext);
    if (!UserContextValue) {
        throw new Error("useAuth used outside");
    }
    return UserContextValue;
}
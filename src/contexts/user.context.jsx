import { createContext,useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// as the actual value to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=> null,
})




export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    // signOutUser();

    useEffect(()=>{
      const unsubcribe =  onAuthStateChangedListener((user)=>{
        // console.log(user);
        if(user) {
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });

      return unsubcribe;
    },[])
    return <UserContext.Provider value={value} >
        {children}
    </UserContext.Provider>
}


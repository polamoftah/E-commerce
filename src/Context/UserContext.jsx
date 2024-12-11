import { createContext, useEffect } from 'react';
import { useState } from 'react';
export let usercountext = createContext();

export function UserContext({ children }) {
  const [token, settoken] = useState(null)
useEffect(()=>{localStorage.getItem("token")


  if(localStorage.getItem("token")){
    settoken(localStorage.getItem("token"))
  }
},[]);

  return <usercountext.Provider value={{token,settoken}}>{children}</usercountext.Provider>;
}

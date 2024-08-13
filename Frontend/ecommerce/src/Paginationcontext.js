import { createContext,useState } from "react";

export const signcontext1 = createContext(1)

export const  Signup1 = ({children}) =>{
  const [pstate,setpstate] = useState(1)
  console.log(pstate);
 
    
    return(
        <signcontext1.Provider value={{pstate,setpstate}}>
            {children}
        </signcontext1.Provider>

    )

}
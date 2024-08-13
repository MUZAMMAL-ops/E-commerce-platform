import { createContext, useState } from "react";

export const searchcontext = createContext(null);


export const Search = ({children})=>{
    const [state1,setstate1] = useState('')
    console.log(state1);

    return(
        <searchcontext.Provider value={{state1,setstate1}}>
            {children}
        </searchcontext.Provider>
    )
}
import { createContext, useState } from "react";


export const counter = createContext(null);

export const Total = ({children})=>{
    const [counter1,setcounter1] = useState()
    console.log('length',counter1);

    return(
        <counter.Provider value={{counter1,setcounter1}}>
            {children}
        </counter.Provider>
    )
}
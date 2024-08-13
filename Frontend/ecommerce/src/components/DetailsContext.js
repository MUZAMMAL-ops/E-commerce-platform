import { createContext, useState } from "react";

export const Details = createContext(null);

export const DetailsProducts = ({children}) => {
    const [Details1,setDetails1] = useState([])

    return(
        <Details.Provider value={{Details1,setDetails1}}>
            {children}
        </Details.Provider>
    )
}


import { createContext, useState } from "react";


export const cartcontext = createContext(null)

export const Cartcount = ({children}) => {
    const [cartstate,setcartstate] = useState(0)
    // console.log('liststate',liststate);

    return(
        <cartcontext.Provider value={{cartstate,setcartstate}}>
            {children}
        </cartcontext.Provider>
    )



}
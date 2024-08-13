import { createContext, useState } from "react";


export const Address1 = createContext(null);

export const ShipmentAddress = ({children}) => {
    const [Addstate,setAddstate] = useState('')
    console.log('Addstate',Addstate);
    return(
        <Address1.Provider value={{Addstate,setAddstate}}>
            {children}
        </Address1.Provider>
    )
}
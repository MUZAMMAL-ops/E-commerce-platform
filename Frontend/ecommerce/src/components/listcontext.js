import { createContext, useState } from "react";


export const listcontext = createContext(null)

export const Arrayofitems = ({children}) => {
    const [liststate,setliststate] = useState([])
    console.log('liststate',liststate);

    return(
        <listcontext.Provider value={[liststate,setliststate]}>
            {children}
        </listcontext.Provider>
    )



}
import { createContext, useState } from "react";



export const Totalcontext = createContext(null);

export const Total1 = ({children}) => {
    const [Totalstate,setTotalstate] = useState({});
    console.log('Totalstate',Totalstate);

    return(
        <Totalcontext.Provider value={{Totalstate,setTotalstate}}>
            {children}
        </Totalcontext.Provider>
    )

}


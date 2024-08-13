import { createContext, useState } from "react";

export const cx = createContext(null);

export const Cxi = ({children})=>{
  const [cxin,setcxin] = useState()

  return(
    <cx.Provider value={{cxin,setcxin}}>
        {children}
    </cx.Provider>
  )
}
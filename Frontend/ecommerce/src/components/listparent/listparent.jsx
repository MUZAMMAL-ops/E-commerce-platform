import React, { useContext,useEffect } from 'react'
import { listcontext } from '../listcontext'
import List from '../list/list'
import Cart from '../cart/Cart'
import { Totalcontext } from '../Totalcontext'
import Total from '../Total/total'

const Listparent = () => {
    const [liststate] = useContext(listcontext)
    const {Totalstate,setTotalstate} = useContext(Totalcontext)

    useEffect(() => {
      const totals = liststate.reduce((accumulator, object) => accumulator + parseFloat(object.price), 0);
      setTotalstate({amount1:parseFloat(totals).toFixed(4)});
      console.log('original',totals)

  }, [liststate, setTotalstate]);
    


    console.log('hello',liststate);
  return (
    <div>
        <Cart/>
        {
            liststate.map((item,index)=>(
                <List index={index} name1={item.name} price1={item.price} />
            ))
        }
        {
          liststate.length>0
          ?<Total/>
          :null
        }
    </div>
  )
}

export default Listparent
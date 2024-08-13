import React, { useContext } from 'react'
import './list.css'
import { listcontext } from '../listcontext';
import DeleteIcon from '@mui/icons-material/Delete';
import { cartcontext } from '../cartcontext';

const List = ({index,name1,price1}) => {
  const [liststate,setliststate] = useContext(listcontext)
  const {cartstate,setcartstate} = useContext(cartcontext)
  console.log('name',name1);
  const remove = () => {
    const updatedList = [...liststate];
    updatedList.splice(index, 1); 
    setliststate(updatedList); 
    setcartstate(cartstate-1)
  };
  
  if (name1) {
    return(
      <>
      <div className="list">
          <div className='flex1'>
          <div className="name2">
              <p>name:{name1}</p>
          </div>
          {/* <div className="count">
                <p>count:</p>
          </div> */}
          <div className="price1">
              <p>price:{price1}</p>
  
          </div>
          <div>
            <button className='delete' type="button" onClick={remove}><DeleteIcon className='db'/></button>
          </div>
          </div>
      </div>
      </>
    )
  }
}
 

export default List
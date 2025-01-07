import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DishDto } from '../../data/api/modals/response/menu';
import { DISHES_API } from '../../data/api/public';
import { AppDispatch } from '../../state/store';
import { addDishToCart } from '../../state/user/cartSlice';
import Loading from '../../components/Loading';




function Menu() {

  const[dishes,setDishes]= useState<DishDto[]>([])

  const[loading, setLoading] = useState(true)
  const[error , setError] = useState(false)

  async function fetchDishes(){

    axios(DISHES_API ,{
      timeout:5000,
      method:'Get',
      headers : {
         'Content-Type' : 'application/json',
      }
    }).then((res) => 
      {
        console.log(res.data)
         const result = res.data
          setDishes(result)
      }
    ).catch((e) => {
       setError(true);
       console.log(e);
    })
    .finally(()=>{setLoading(false)})
  
  }



  useEffect(()=>{
     fetchDishes();
  },[])

  return (

  <div className='w-full min-h-screen'>
    {
      loading ? <div className='flex flex-col items-center justify-center'> <Loading/> </div>
      :
      error ?
      <div className="flex flex-col items-center justify-center min-h-screen">
  <p className="text-3xl font-extrabold text-color-darkGreen mb-4">
    Oops!
  </p>
  <p className="text-2xl font-semibold text-color-darkGreen">
    Network Error Occurred.
  </p>
</div>

:
      <div className='grid grid-cols-4 gap-10 bg-color-cream'>
      {
        dishes.map(dish => (
          
          <DishDisplayCart {...dish}/>
          
        ))} 
      
    </div>
    }
    </div>
  )
}

const DishDisplayCart : React.FC<DishDto> = (dish : DishDto) => {


  const [active , setActive] = useState(true)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch<AppDispatch>()

  return(
    <div
    >{
    active?
    <div className='w-80 h-96 bg-color-lightGreen rounded-xl'
    onClick={() => setActive(!active)}
    >
      <div className=' px-20 py-10'>
        <img src={dish.url} className='size-40 rounded-full' ></img>
      </div>
      <div className='px-4 text-center text-color-darkGreen font-bold text-2xl'>
        {dish.name}
      </div>
      <div className='px-4 text-center text-color-darkGreen font-small text-2xl'>
        {"Rs "+dish.price}
      </div>
    </div>
    :
    <div className='w-80 h-96 border-1 border-color-darkGreen'>
      <div className='h-16 px-20'>
      <img src={dish.url} className='size-40 rounded-full' 
       onClick={() => { setActive(!active); setCount(0)}}
      ></img>
      </div>
      <div className='bg-color-lightGreen w-full h-80 rounded-xl' >
        <p className='pt-28 text-center font-bold text-color-darkGreen text-xl'>{dish.description}</p>
        <div className='h-12  m-4 border-2 border-color-darkGreen rounded-2xl flex justify-around items-center'>
          <div onClick={ ()=>{setCount(count+1)}}>
            <AddIcon className=' scale-125' />
          </div>
          {count}
          <div onClick={()=>{setCount(Math.max(0,count-1))}}>
            <RemoveIcon className=' scale-125'/>
          </div>
        </div>
        <div className='h-12 bg-color-darkGreen rounded-2xl text-white m-4 font-medium text-center p-3' 
           onClick={
            () => {
              HandelAddToCart(dispatch,dish,count)
              setCount(0)     
          }
          }
        >Add to cart</div>
      </div>
     
    </div> 
    }
   
    </div>
  )
}




function HandelAddToCart(dispatch : AppDispatch, dish : DishDto , quantity : number){
   
     if(quantity != 0) 
    dispatch(addDishToCart({dish,quantity}))


}





export default Menu
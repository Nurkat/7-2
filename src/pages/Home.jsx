
import React, { useEffect, useState } from 'react'
import TableCustom from '../components/TableCustom'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate =  useNavigate()
  const[products,setProducts] =useState([])
  const[isLoading, setIsLoading] =useState(false)
  const[refresh,setRefresh] =useState(false)
  useEffect(()=>{
axios("http://localhost:3000/products").then(res=>{
  res.data.map((item,index) =>{
    switch(res.data.productType){
      case "1":
        item.productType ="Fruits"
      break;
      case "2":
        item.productType ="Vegetables"
      break;
      case "3":
        item.productType ="Spices"
      break;
    }
    item.key = Math.random()
    item.ID = index + 1
    item.action = <div className='flex space-x-2'>
     <button onClick={() => handleDeleteProduct(item.id)} className='w-[30px] bg-red-500 text-white  hover:text-red-500 hover:border-red-500 hover:bg-transparent h-[30px] border-[1px] rounded-full '><DeleteOutlined className='hover:scale-125'/></button>
     <button className='w-[30px] bg-green-500 text-white border-green-500 hover:text-green-500 hover:border-green-500 hover:bg-transparent h-[30px] border-[1px] rounded-full '><EditOutlined className='hover:scale-125'/></button>
    </div>
  })
  setProducts(res.data)
  setIsLoading(false)

})
  },[refresh])
  function handleDeleteProduct(id){
   axios.delete(`http://localhost:3000/products/${id}`).then(res=>{
     setIsLoading(true)
     setTimeout (()=>{
      setRefresh(!refresh)
      toast.success("Successfully Deleted")
     },800)
   }).catch(()=>toast.error("You have some Error"))
    

  }
  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false}/>
        <div className='flex items-center justify-between'>
            <div>
            <h2 className='text-[25px] font-bold'>Products</h2>
            <p className='text-[15px] text-slate-400 '>Selected products({products.length})</p>
            </div>
            <Button onClick={()=>navigate("/add-product")} className='!bg-[#ffa200] hover:opacity-80' size='large'  type='primary' htmlType='submit'>Add Product</Button>
        </div>
            <div className='mt-[30px]'>
                <TableCustom isLoading={isLoading} products={products}/>
            </div>

    </div>
  )
}

export default Home
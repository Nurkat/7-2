import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import SelectCustom from '../components/SelectCustom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function AddProduct() {
  const navigate =useNavigate()
  const[productName, setProductName]=useState("")
  const[productPrice, setProductPrice]=useState("")
  const[productType, setProductType]=useState("")
  const[productDate, setProductDate]=useState("") 
  
  
  const ChangeDate = (date, dateString) => {
    setProductDate(dateString);
  }
  
  function handleAddProductSubmit(e){
    e.preventDefault()
    const data = {productName,productPrice,productType,productDate}
    axios.post("http://localhost:3000/products",data)
    .then(res=>{
      toast.success('Successfully Added!') 
      setTimeout(()=>{
        navigate("/")
      },800)
    }).catch(err=>{
      toast.error('Something is wrong') 
    })
  }

  return (
    <form onSubmit={handleAddProductSubmit}>
      <Toaster position="top-center" reverseOrder={false}/>

      <div className='p-5 flex items-center justify-between'>
        <h2 className='text-[25px] font-bold'>Add Product</h2>
        <Button className='!bg-[#ffa200] hover:opacity-80' size='large'  type='primary' htmlType='submit'>Save Product</Button>
      </div>
    <div className='w-[450px] p-5 space-y-5'>
    <Input  value={productName} onChange={(e) => setProductName(e.target.value)} allowClear className='p-2' size='large' name='productName' type='text' placeholder='Enter product name'/>
    <Input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} allowClear className='p-2' size='large' name='productPrice' type='number' placeholder='Enter product price'/>
    <SelectCustom setProductType={setProductType}/>
    <DatePicker size='large' className='w-full p-2' onChange={ChangeDate} />
</div>
    </form>
  )
}

export default AddProduct
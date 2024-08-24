import { Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectCustom from '../components/SelectCustom'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useAxios } from '../hook/useAxios'
import dayjs from 'dayjs'


function AddProduct() {
  const {id} =useParams()
  const date = new Date()
  const nowDate = `${ date.getFullYear()}-${String(date.getMonth() +1).padStart(2,0)} -${String(date.getDay()).padStart(2,0)}`
  const navigate =useNavigate()
  const[productName, setProductName]=useState(null)
  const[productPrice, setProductPrice]=useState(null)
  const[productType, setProductType]=useState(null)
  const[productDate, setProductDate]=useState(nowDate) 

  
  const ChangeDate = (date, dateString) => {
    setProductDate(dateString);
  }
  
  function handleAddProductSubmit(e){
    e.preventDefault()
    const data = {productName,productPrice,productType,productDate}
    if(id){
      data.id = id
      useAxios().put(`products/${id}`,data) .then(res=>{
        toast.success('Successfully Updated!') 
        setTimeout(()=>{
          navigate("/")
        },800)
      }).catch(err=>{
        toast.error('Something is wrong') 
      })

    }
    else{
      useAxios().post("products",data) .then(res=>{
        toast.success('Successfully Added!') 
        setTimeout(()=>{
          navigate("/")
        },800)
      }).catch(err=>{
        toast.error('Something is wrong') 
      })
    }
  }
     const dateFormat ="YYYY-MM-DD"
    useEffect(() =>{
      if(id){
        useAxios().get(`/products/${id}`).then(res =>{
          setProductName(res.data.productName)
          setProductPrice(res.data.productPrice)
          setProductType(res.data.productType)
          setProductDate(res.data.productDate)
        })
      }
    })


  return (
    <form onSubmit={handleAddProductSubmit}>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className='p-5 flex items-center justify-between'>
      <div className='flex items-center gap-4'>
       <button type='button' onClick={()=> navigate(-1)}><ArrowLeftOutlined className='scale-150'/></button>
        <h2 className='text-[25px] font-bold'>{id? "Update" :"Add"}Product</h2>
      </div>
        <Button className='!bg-[#ffa200] hover:opacity-80' size='large'  type='primary' htmlType='submit'>{id? "Update" :"Save"} Product</Button>
      </div>
    <div className='w-[450px] p-5 space-y-5'>
    <Input required  value={productName} onChange={(e) => setProductName(e.target.value)} allowClear className='p-2' size='large' name='productName' type='text' placeholder='Enter product name'/>
    <Input required value={productPrice} onChange={(e) => setProductPrice(e.target.value)} allowClear className='p-2' size='large' name='productPrice' type='number' placeholder='Enter product price'/>
    <SelectCustom productType={productType} setProductType={setProductType}/>
    <DatePicker value={dayjs(productDate,dateFormat)} size='large' className='w-full p-2' onChange={ChangeDate} />
</div>
    </form>
  )
}

export default AddProduct
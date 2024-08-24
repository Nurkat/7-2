import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button} from 'antd'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import ModalCustom from '../components/ModalCustom'


function SingleProduct() {
  const {id} =useParams()
  const navigate = useNavigate()
  const [singleData, setSingleData] = useState({})
  const [isOpenModal,setIsOpenModal] = useState(false)

  useEffect(()=>{
    useAxios().get(`/products/${id}`).then(res =>{
  setSingleData(res.data)
    })
  },[])

  function sureDeleteProduct(){
    useAxios().delete(`/products/${id}`).then(res=>{
      setIsOpenModal(false)
      toast.success("Successfully Deleted")
      setTimeout (()=>{
        navigate(-1)
      },800)
    }).catch(()=>toast.error("You have some Error"))
     
  }
  return (
    <div className='p-5'>
       <Toaster position="top-center" reverseOrder={false}/>
      <div className='p-5 flex items-center justify-between'>
      <div className='flex items-center gap-4'>
       <button type='button' onClick={()=> navigate(-1)}><ArrowLeftOutlined className='scale-150'/></button>
        <h2 className='text-[25px] font-bold'>{singleData?.productName}</h2>
      </div>
      <div className='flex  items-center space-x-3'>
      <Button onClick={() => setIsOpenModal(true)} className='!bg-red-500 hover:opacity-80' size='large'  type='primary' htmlType='submit'>Delete</Button>
      <Button onClick={() =>navigate(`/update/${id}`)} className='!bg-[#ffa200] hover:opacity-80' size='large'  type='primary' htmlType='submit'>Update Product</Button>
      </div>
    </div>
    <div className='mt-[30px]'>
      <ul className='w-[50%] p-5 rounded-lg border-[2px] border-slate-400 space-y-4'>
     <div>
      <span className='text-slate-500 text-[14px]'>Product Name</span>
      <p className='text-[25px] leading-[18px]'>{singleData.productName}</p>
     </div>
     <div>
      <span className='text-slate-500 text-[14px]'>Product Price</span>
      <p className='text-[25px] leading-[18px]'>{singleData.productPrice}</p>
     </div>
     <div>
      <span className='text-slate-500 text-[14px]'>Product Type</span>
      <p className='text-[25px] leading-[18px]'>
      {singleData.productType =="1" && "Fruits" }
      {singleData.productType =="2" && "Vegetables"}
      {singleData.productType =="3" && "Spices"}
      </p>
     </div>
     <div>
      <span className='text-slate-500 text-[14px]'>Product Date</span>
      <p className='text-[25px] leading-[18px]'>{singleData.productDate}</p>
     </div>
      </ul>
      <ModalCustom title={"Are you sure to delete"} handleOk={sureDeleteProduct} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>
    
    </div>
    </div>
  )
}

export default SingleProduct
import { Modal } from 'antd'
import React from 'react'

function ModalCustom({isOpenModal,handleOk,setIsOpenModal,title,children}) {
  return (
    <Modal
    title={title}
    open={isOpenModal}
    onOk={handleOk}
    onCancel={() => setIsOpenModal(false)}
  >
    {children}
  </Modal>
  )
}

export default ModalCustom
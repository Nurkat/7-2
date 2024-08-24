import React from 'react';
import { Select } from 'antd';
const SelectCustom = ({setProductType,productType}) => {
    function handleChange (id, obj) {
        setProductType(id)
    }
    return(
        <Select
        value={productType}
        className='w-full'
        size='large'
        allowClear
        onChange={handleChange}
        showSearch
        placeholder="Choose a type"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'Fruits',
          },
          {
            value: '2',
            label: 'Vegetables',
          },
          {
            value: '3',
            label: 'Spices',
          },
        ]}
      />
    )
}
export default SelectCustom;
import React, { useState } from 'react';
import { AppstoreOutlined,MinusOutlined,ProductOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { icons } from 'antd/es/image/PreviewGroup';
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    icon: <ProductOutlined className='scale-[1.5]' />,
    label: <h1 className='text-[22px]'>Product</h1>,
    children: [
      {
        key: '11',
        label: <Link to={'/'}>All Products</Link>,
        icon:<MinusOutlined/>
      }, 
    ], 
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const App = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div className='w-full h-[100vh]'>
    <div className='h-[15%] bg-[#001529] p-5 flex items-center space-x-5'>
      <img src={Logo} alt="LogoImg" width={70} height={70} />
      <h2 className='text-white'>My Product</h2>
    </div>
      <Menu
        mode="inline"
        theme='dark'
        defaultSelectedKeys={['231']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width:"100%",
          height:"85%"
        }}
        items={items}
      />
    </div>
  );
};
export default App;
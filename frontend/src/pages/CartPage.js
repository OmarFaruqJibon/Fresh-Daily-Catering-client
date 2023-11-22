import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';


const CartPage = () => {

    const { cartItems } = useSelector((state) => state.rootReducer)



    const columns = [
        { title: "Name", dataIndex: 'name' },
        {
            title: "Image",
            dataIndex: 'image',
            render: (image, record) => (<img src={image} alt={record.name} width="60px" height="60px" />)
        },
        { title: "Price", dataIndex: 'price' },
        { title: "Quantity", dataIndex: '1' },
        {
            title: "Actions",
            dataIndex: '_id',
            render: (id, record) => <DeleteOutlined />,
        }
    ]



    return (
        <DefaultLayout>
            <p style={{ fontWeight: 700 }}>Shopping Cart</p>
            <Table columns={columns} dataSource={cartItems} />
        </DefaultLayout>
    );
};

export default CartPage;
import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';


const CartPage = () => {

    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.rootReducer)

    const handleIncrement = (record) => {
        dispatch({
            type: 'UPDATE_CART',
            payload: { ...record, quentity: record.quentity + 1 }
        })
    }
    const handleDecrement = (record) => {
        if (record.quentity !== 1) {
            dispatch({
                type: 'UPDATE_CART',
                payload: { ...record, quentity: record.quentity - 1 }
            })
        }

    }


    const columns = [
        { title: "Name", dataIndex: 'name' },
        {
            title: "Image",
            dataIndex: 'image',
            render: (image, record) => (<img src={image} alt={record.name} width="60px" height="60px" />)
        },
        { title: "Price", dataIndex: 'price' },
        {
            title: "Quantity",
            dataIndex: '_id',
            render: (id, record) => <div>
                <PlusCircleOutlined className='mx-3'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleIncrement(record)}
                />
                <b>{record.quentity}</b>
                <MinusCircleOutlined className='mx-3'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDecrement(record)}
                />
            </div>
        },
        {
            title: "Actions",
            dataIndex: '_id',
            render: (id, record) => <DeleteOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({
                    type: "REMOVE_ITEM_FROM_CART",
                    payload: record
                })}
            />,
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
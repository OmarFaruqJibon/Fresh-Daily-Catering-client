import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();


    const [bill, setBill] = useState(0);
    const [billPopup, setBillPopup] = useState(false);

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

    // console.log(cartItems);
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

    // total bill calculation and set to state
    useEffect(() => {
        let temp = 0;
        cartItems.forEach(element => {
            temp = temp + (element.price * element.quentity)
        });
        setBill(temp)
    }, [cartItems])

    console.log(bill);

    const handleOnSubmit = async (values) => {
        try {
            const newBill = {
                ...values,
                totalBill: bill,
                totalItems: cartItems.length,
                billerId: JSON.parse(localStorage.getItem('auth'))._id,
                billerName: JSON.parse(localStorage.getItem('auth')).name,
                cartItems,
            }
            console.log(newBill);

            await axios.post('http://localhost:8080/api/bills/create-bill', newBill);

            message.success("Bill created successfully.")
            setBillPopup(false);
            navigate("/bills");
        } catch (error) {
            console.log(error);
            message.error("Bill created failed.")
        }
    }

    return (
        <DefaultLayout>
            <h1 className='home-title' style={{ textAlign: "none" }}>Confirm Bill</h1>
            <Table columns={columns} dataSource={cartItems} />

            <hr />
            <div className="d-flex justify-content-between mt-5">
                <h5 style={{ color: 'crimson', fontWeight: 700 }}>Totall Bill - $ {bill}</h5>
                <Button type='primary' onClick={() => setBillPopup(true)}>Create Invoice</Button>
            </div>



            <Modal
                title="Invoice"
                visible={billPopup} onCancel={() => { setBillPopup(false) }}
                footer={false}
            >

                <Form layout="vertical" onFinish={handleOnSubmit}>
                    <Form.Item name="customerName" label="Customer Name">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item name="customerContact" label="Contact Number">
                        <Input />
                    </Form.Item>

                    <Form.Item name="customerAddress" label="Address">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item name="paymentMethod" label="Payment Method">
                        <Select>
                            <Select.Option value="card">Card</Select.Option>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="online">Online</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ color: 'crimson', fontWeight: 700 }}>Totall Bill - $ {bill}</h6>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default CartPage;
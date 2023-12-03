import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Button, Table, Modal, Form, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

const Items = () => {
    const dispatch = useDispatch();

    const [itemsData, setItemsData] = useState([]);
    const [popupMoal, setPopupModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const getAllItems = async () => {

        try {
            dispatch({
                type: "SHOW_LOADING",
            });
            const { data } = await axios.get('http://localhost:8080/api/items/get-item');
            setItemsData(data)
            dispatch({ type: "HIDE_LOADING" });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllItems();
    }, []);

    const columns = [
        { title: "Name", dataIndex: 'name' },
        {
            title: "Image",
            dataIndex: 'image',
            render: (image, record) => (<img src={image} alt={record.name} width="60px" height="60px" />)
        },
        { title: "Price", dataIndex: 'price' },
        {
            title: "Actions",
            dataIndex: '_id',
            render: (id, record) =>
                <div>
                    <FormOutlined
                        className='mx-3'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setEditItem(record)
                            setPopupModal(true)
                        }}
                    />
                    <DeleteOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleDelete(record)
                        }}
                    />
                </div>
        }
    ]

    const handleOnSubmit = async (values) => {
        if (editItem === null) {
            // add new item
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });

                const res = await axios.post('http://localhost:8080/api/items/add-item', values);
                message.success("Item add successfully.")
                setPopupModal(false);
                getAllItems();
                dispatch({ type: "HIDE_LOADING" });

            } catch (error) {
                console.log(error);
                message.success("Item add failed!")
                dispatch({ type: "HIDE_LOADING" });
            }
        } else {
            // edit item
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });

                await axios.put('http://localhost:8080/api/items/edit-item', { ...values, itemId: editItem._id });
                message.success("Item update successfully.")
                setPopupModal(false);
                getAllItems();
                dispatch({ type: "HIDE_LOADING" });

            } catch (error) {
                console.log(error);
                message.success("Item update failed!")
                dispatch({ type: "HIDE_LOADING" });
            }
        }
    };


    const handleDelete = async (record) => {
        console.log(record._id);
        try {
            dispatch({
                type: "SHOW_LOADING",
            });

            await axios.post('http://localhost:8080/api/items/delete-item', { itemId: record._id });
            message.success("Item delete successfully.")
            getAllItems();
            dispatch({ type: "HIDE_LOADING" });

        } catch (error) {
            console.log(error);
            message.success("Item delete failed!")
            dispatch({ type: "HIDE_LOADING" });
        }
    }

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h5>Items</h5>
                <Button type='primary' onClick={() => setPopupModal(true)}>Add Item</Button>
            </div>

            <Table columns={columns} dataSource={itemsData} />

            {popupMoal &&
                <Modal
                    title={` ${editItem !== null ? "Edit Item" : "Add New Item"} `}
                    open={popupMoal} onCancel={() => {
                        setPopupModal(false)
                        setEditItem(null)
                    }}
                    footer={false}
                >

                    <Form layout="vertical" initialValues={editItem} onFinish={handleOnSubmit}>
                        <Form.Item name="name" label="Name">
                            <input type="text" />
                        </Form.Item>

                        <Form.Item name="price" label="Price">
                            <input />
                        </Form.Item>

                        <Form.Item name="image" label="Image URL">
                            <input type="text" />
                        </Form.Item>

                        <Form.Item name="category" label="Category">
                            <Select>
                                <Select.Option value="snacks">Snacks</Select.Option>
                                <Select.Option value="drinks">Drinks</Select.Option>
                                <Select.Option value="rice">Rice</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            }

        </DefaultLayout>
    );
};

export default Items;
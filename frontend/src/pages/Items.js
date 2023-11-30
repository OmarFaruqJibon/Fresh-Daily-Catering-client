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

    useEffect(() => {
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

        getAllItems();
    }, []);

    // console.log(itemsData);

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
                    <FormOutlined className='mx-3' style={{ cursor: 'pointer' }} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                </div>
        }
    ]

    const onFinish = async (values) => {
        try {
            dispatch({
                type: "SHOW_LOADING",
            });

            const res = await axios.post('http://localhost:8080/api/items/add-item', values);
            message.success("Item add successfully.")

            dispatch({ type: "HIDE_LOADING" });

        } catch (error) {
            console.log(error);
            message.success("Item add failed!")
        }

    };

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h5>Items</h5>
                <Button type='primary' onClick={() => setPopupModal(true)}>Add Item</Button>
            </div>

            <Table columns={columns} dataSource={itemsData} />

            <Modal title="Add New Item" open={popupMoal} onCancel={() => setPopupModal(false)} footer={false}>

                <Form layout="vertical" onFinish={onFinish}>

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




        </DefaultLayout>
    );
};

export default Items;
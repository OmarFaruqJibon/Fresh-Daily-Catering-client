import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);

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
    }, ([]));
    console.log(itemsData);

    return (
        <DefaultLayout>
            <Row>
                {
                    itemsData.map(item =>
                        <Col lg={8} md={12} sx={24} sm={6} >
                            <ItemList item={item} />
                        </Col>
                    )}

            </Row>

        </DefaultLayout>

    );
};

export default Home;
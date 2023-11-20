import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';

const Home = () => {

    const [itemsData, setItemsData] = useState([]);

    useEffect(() => {
        const getAllItems = async () => {

            try {
                const { data } = await axios.get('http://localhost:8080/api/items/get-item');
                setItemsData(data)

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
                        <Col lg={6} md={12} sx={24} sm={6} >
                            <ItemList item={item} />
                        </Col>
                    )}


            </Row>








        </DefaultLayout>


    );
};

export default Home;
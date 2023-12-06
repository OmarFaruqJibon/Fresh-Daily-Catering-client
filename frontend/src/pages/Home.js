import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);

    const [selecedCategory, setSelecedCategory] = useState("Snacks");
    const categories = [
        {
            name: "All",
            // imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
        },
        {
            name: "Snacks",
            // imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
        },
        {
            name: "Drinks",
            // imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
        },
        {
            name: "Rice",
            // imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
        },

    ];

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
    // console.log(itemsDsata);

    return (
        <DefaultLayout>
            <div className="d-flex">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className={`d-flex category ${selecedCategory.toLowerCase() === category.name.toLowerCase() && "category-active"
                            }`}
                        onClick={() => setSelecedCategory(category.name)}
                    >
                        <p>{category.name}</p>
                        {/* <img
                            src={category.imageUrl}
                            alt={category.name}
                            height="40"
                            width="60"
                        /> */}
                    </div>
                ))}
            </div>

            <Row>
                {
                    itemsData.filter((i) => i.category.toLowerCase() === selecedCategory.toLowerCase()).map(item =>
                        <Col lg={8} md={12} sx={24} sm={6} >
                            <ItemList item={item} />
                        </Col>
                    )}

            </Row>

        </DefaultLayout>

    );
};

export default Home;
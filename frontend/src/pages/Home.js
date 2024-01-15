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
            name: "Snacks",
            imageUrl: "https://i.postimg.cc/J0nQmpJp/Asset-10-20x20_(1).png",
        },
        {
            name: "Rice",
            imageUrl: "https://i.postimg.cc/MG97q98r/japanese-food.png",
        },

        {
            name: "Cake",
            imageUrl: "https://i.postimg.cc/hjKrZDGW/Asset-11-20x20.png",
        },
        {
            name: "Drinks",
            imageUrl: "https://i.postimg.cc/qvdS3vCH/poinsettia.png",
        },
        {
            name: "Sweets",
            imageUrl: "https://i.postimg.cc/wvFkSCtt/Asset-8-20x20.png",
        },
        {
            name: "Cookies",
            imageUrl: "https://i.postimg.cc/zfC7kb8F/Asset-9-1-20x20.png",
        },
        {
            name: "Others",
            imageUrl: "https://i.postimg.cc/zGR0V2QM/Asset-7-20x20.png",
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
            <h1 className='home-title'>Products & Categories</h1>
            <div className="category-container">

                {categories.map((category) => (
                    <div
                        key={category.name}
                        className={`category ${selecedCategory.toLowerCase() === category.name.toLowerCase() && "category-active"
                            }`}
                        onClick={() => setSelecedCategory(category.name)}
                    >
                        <p>{category.name}</p>
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            height="25"
                            width="30"
                        />
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
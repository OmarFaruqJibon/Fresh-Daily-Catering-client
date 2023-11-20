import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';

const Items = () => {

    const [items, setItems] = useState([])

    useEffect( () => {
        const url = "http://localhost:8080/api/items/get-item";

        const getData = async () => {
            const {data} = await axios.get(url);
            setItems(data)
        }
        getData()
    }, ([]));

    
    console.log(items);


    return (
        <DefaultLayout>
           <h1>Items</h1>
           
           
           
           </DefaultLayout>
    );
};

export default Items;
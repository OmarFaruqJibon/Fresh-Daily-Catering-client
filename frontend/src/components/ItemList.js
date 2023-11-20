import React from 'react';
import { Card } from 'antd';


const ItemList = ({ item }) => {
    const { Meta } = Card;
    return (
        <div>
            <Card
                hoverable
                style={{ width: 240, padding: 10, marginBottom: 20 }}
                cover={<img height={200} alt="example" src={item.image} />}
            >
                <Meta title={item.name} />
                <Meta title={item.price} />
            </Card>









        </div>
    );
};

export default ItemList;
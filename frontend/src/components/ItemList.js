import React from 'react';
import { Button, Card } from 'antd';


const ItemList = ({ item }) => {
    const { Meta } = Card;
    return (
        <div>
            <Card
                // hoverable
                style={{ width: 250, padding: 10, marginBottom: 30, marginTop: 10 }}
                cover={<img height={200} alt="example" src={item.image} />}
            >
                <Meta title={item.name} />
                <div className="item-info">
                    <span>Price: $ {item.price}</span>
                    <Button>Add to Cart</Button>
                </div>
            </Card>









        </div>
    );
};

export default ItemList;
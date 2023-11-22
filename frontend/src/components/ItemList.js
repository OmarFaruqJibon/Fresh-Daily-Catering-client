import React from 'react';
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux'

const ItemList = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, quentity: 1 }
        })
    }

    const { Meta } = Card;
    return (
        <div>
            <Card
                // hoverable
                style={{ width: 250, padding: 10, marginBottom: 30, marginTop: 10 }}
                cover={<img height={200} alt={item.name} src={item.image} />}
            >
                <Meta title={item.name} />
                <div className="item-info">
                    <span>Price: $ {item.price}</span>
                    <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
                </div>
            </Card>


        </div>
    );
};

export default ItemList;
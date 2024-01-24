import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleOnSubmit = async (values) => {
        console.log(values);

        try {
            dispatch({
                type: "SHOW_LOADING",
            });

            await axios.post('http://localhost:8080/api/users/register', values);
            message.success("Register successfully.")
            navigate('/login');
            dispatch({ type: "HIDE_LOADING" });

        } catch (error) {
            console.log(error);
            message.error("Register failed!")
            dispatch({ type: "HIDE_LOADING" });
        }
    }


    return (
        <div className='register'>
            <h3>Register</h3>
            <Form layout="vertical" onFinish={handleOnSubmit}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <Form.Item name="userId" label="User ID">
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password">
                    <Input />
                </Form.Item>

                <div className="d-flex justify-content-between">
                    <p style={{ fontSize: "1em" }}> Already Register? <Link to="/login" style={{ textDecoration: "none" }}> Login</Link> </p>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default Register;
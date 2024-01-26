import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = async (value) => {
        try {
            dispatch({
                type: "SHOW_LOADING",
            });

            const res = await axios.post('http://localhost:8080/api/users/login', value);
            message.success("Login successfully.")

            dispatch({ type: "HIDE_LOADING" });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate('/');


        } catch (error) {
            console.log(error);
            message.error("Login failed!")
            dispatch({ type: "HIDE_LOADING" });
            navigate('/login');
        }
    }

    //currently login  user
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            localStorage.getItem("auth");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className='register'>
            <h3 >Login</h3>
            <Form layout="vertical" onFinish={handleOnSubmit}>

                <Form.Item name="userId" label="User ID">
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password">
                    <Input />
                </Form.Item>

                <div className="d-flex justify-content-between">
                    <p style={{ fontSize: "1em" }}> New User? <Link to="/register" style={{ textDecoration: "none" }}> Register</Link> </p>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default Login;
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { Table } from "antd";

const Customer = () => {
    const dispatch = useDispatch();
    const [billsData, setBillsData] = useState([]);

    // fetch all bills from database
    const getAllBills = async () => {
        try {
            dispatch({
                type: "SHOW_LOADING",
            });
            const { data } = await axios.get("https://fresh-daily-catering-server.onrender.com/api/bills/get-bill");
            setBillsData(data);
            dispatch({ type: "HIDE_LOADING" });
            // console.log(data);
        } catch (error) {
            dispatch({ type: "HIDE_LOADING" });
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBills();
    }, []);

    const columns = [
        { title: "Cutomer Name", dataIndex: "customerName" },
        { title: "ID", dataIndex: "_id" },
        { title: "Address", dataIndex: "customerAddress" },
        { title: "Quentity", dataIndex: "totalItems" },
        { title: "Total Spend", dataIndex: "totalBill" },

    ];

    return (
        <DefaultLayout>
            <h1 className='home-title' style={{ textAlign: "inherit" }}>Customers</h1>
            <Table columns={columns} dataSource={billsData} bordered pagination={false} />

        </DefaultLayout>
    );
};

export default Customer; 
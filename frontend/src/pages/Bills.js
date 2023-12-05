import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import "../style/InvoiceStyles.css";


const Bills = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const [billsData, setBillsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const getAllBills = async () => {
        try {
            dispatch({
                type: "SHOW_LOADING",
            });
            const { data } = await axios.get("http://localhost:8080/api/bills/get-bill");
            setBillsData(data);
            dispatch({ type: "HIDE_LOADING" });
            console.log(data);
        } catch (error) {
            dispatch({ type: "HIDE_LOADING" });
            console.log(error);
        }
    };
    //useEffect
    useEffect(() => {
        getAllBills();
        //eslint-disable-next-line
    }, []);


    //print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //able data
    const columns = [
        // { title: "ID ", dataIndex: "_id" },
        {
            title: "Cutomer Name",
            dataIndex: "customerName",
        },
        { title: "Contact No", dataIndex: "customerContact" },
        { title: "Quentity", dataIndex: "totalItems" },
        { title: "Total Amount", dataIndex: "totalBill" },

        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <EyeOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectedBill(record);
                            setPopupModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];
    console.log(selectedBill);
    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h1>Invoice list</h1>
            </div>

            <Table columns={columns} dataSource={billsData} bordered />

            {popupModal && (
                <Modal
                    width={400}
                    pagination={false}
                    title="Invoice Details"
                    visible={popupModal}
                    onCancel={() => {
                        setPopupModal(false);
                    }}
                    footer={false}
                >


                    {/* ============ invoice modal start ==============  */}
                    <div id="invoice-POS" ref={componentRef}>
                        <center id="top">
                            {/* <div className="logo" /> */}
                            <div className="info">
                                <h2>Unique Export</h2>
                                <p> Contact : 54185156 | Rajshahi</p>
                            </div>
                            {/*End Info*/}

                        </center>
                        {/*End InvoiceTop*/}
                        <div id="mid">
                            <div className="mt-2">
                                <p>
                                    Customer Name : <b>{selectedBill.customerName}</b>
                                    <br />
                                    Phone No : <b>{selectedBill.customerContact}</b>
                                    <br />
                                    Address : <b>{selectedBill.customerAddress}</b>
                                    <br />
                                    {/* Date : <b>{selectedBill.date.toString().substring(0, 10)}</b> */}
                                    <br />
                                </p>
                                <hr style={{ margin: "5px" }} />
                            </div>
                        </div>

                        {/*End Invoice Mid*/}

                        <div id="bot">
                            <div id="table">
                                <table>
                                    <tbody>
                                        <tr className="tabletitle">
                                            <td className="item">
                                                <h2>Item</h2>
                                            </td>
                                            <td className="Hours">
                                                <h2>Quantity</h2>
                                            </td>
                                            <td className="Rate">
                                                <h2>Price</h2>
                                            </td>
                                            <td className="Rate">
                                                <h2>Total Amount</h2>
                                            </td>
                                        </tr>
                                        {selectedBill.cartItems.map((item) => (
                                            <>
                                                <tr className="service">
                                                    <td className="tableitem">
                                                        <p className="itemtext">{item.name}</p>
                                                    </td>
                                                    <td className="tableitem">
                                                        <p className="itemtext">{item.quentity}</p>
                                                    </td>
                                                    <td className="tableitem">
                                                        <p className="itemtext">$ {item.price}</p>
                                                    </td>
                                                    <td className="tableitem">
                                                        <p className="itemtext">
                                                            $ {item.quentity * item.price}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}


                                        <tr className="tabletitle">
                                            <td />
                                            <td />
                                            <td className="Rate">
                                                <h2>Total Bill</h2>
                                            </td>
                                            <td className="payment">
                                                <h2>
                                                    <b>${selectedBill.totalBill}</b>
                                                </h2>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            {/*End Table*/}

                            <div className="biller-info">
                                <p>Bill by: {selectedBill.billerName}</p>
                            </div>

                            <div id="legalcopy">
                                <p className="legal">
                                    <strong>Thank you for your order!</strong>
                                </p>
                            </div>

                        </div>
                        {/*End InvoiceBot*/}
                    </div>
                    {/*End Invoice*/}



                    <div className="d-flex justify-content-end mt-3" >
                        <Button type="primary" onClick={handlePrint}>
                            Print
                        </Button>
                    </div>
                    {/* ============ invoice modal ends ==============  */}
                </Modal>
            )}
        </DefaultLayout>
    );
};

export default Bills;
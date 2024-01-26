import React from "react";

const Spinner = () => {
    return (
        <div className="spinner">
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    );
};

export default Spinner;
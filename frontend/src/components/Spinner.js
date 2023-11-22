import React from "react";

const Spinner = () => {
    return (
        <div className="spinner">
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    );
};

export default Spinner;
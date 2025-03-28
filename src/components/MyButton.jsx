import React from 'react';

const MyButton = ({ text, onClick, ...props }) => {

    const onClick_ = (e) => {
        e.preventDefault;

        onClick();
    }

    return (
        <button onClick={onClick_}             
            {...props} >
            { text }
        </button>
    );
};

export default MyButton;
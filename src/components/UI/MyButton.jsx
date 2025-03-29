import React from 'react';

const MyButton = ({ children, onClick, ...props }) => {

    const onClick_ = (e) => {
        e.preventDefault;

        onClick();
    }

    return (
        <button onClick={onClick_}             
            {...props} >
            { children }
        </button>
    );
};

export default MyButton;
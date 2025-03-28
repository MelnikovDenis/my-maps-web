import React from 'react';

const MyInput = ({ value, setValue, placeholder, type }) => {

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <input type={type}
            placeholder={placeholder}
            value={value} 
            onChange={onChange} 
            className='myInput' />
    );
};

export default MyInput;
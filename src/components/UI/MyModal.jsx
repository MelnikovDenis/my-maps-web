import React from 'react';

const MyModal = ({children, visible, setVisible}) => {
    return (
        <div className={!visible ? "myModal active" : "myModal"} 
            onClick={() => setVisible(false)}>

            <div className="myModal__inner" 
                onClick={(e) => e.stopPropagation()}>                    
                { children }
            </div>

        </div>
    );
};

export default MyModal;
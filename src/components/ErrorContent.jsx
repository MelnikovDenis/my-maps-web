import React from 'react';
import MyButton from './UI/MyButton';

const ErrorContent = ({error, onExit}) => {
    return (
        <div className='errorContent'>
            <div className='errorContent__inner'>

                <div className='errorContent__title'>
                    Ошибка
                </div>

                <div className='errorContent__message'>
                    {error}
                </div>

                <div className='button__wrapper'>
                    <div className='button__wrapper__inner'>
                        <MyButton className="myButton" 
                            onClick={onExit}>
                            Ок
                        </MyButton>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ErrorContent;
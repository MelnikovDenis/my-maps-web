import React from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();    

    const onExit = () => {
        logout();

        navigate('/auth');
    }

    return (
        <header className='header'>
            <div className='header__inner'>
                <h1 className='header__logo'>MyMaps</h1>
                <MyButton onClick={onExit} 
                    text="Выйти"
                    className={isAuthenticated ? "exitButton" : "hidden"}/>
            </div>
        </header>
    );
};

export default Header;
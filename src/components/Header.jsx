import React from 'react';
import MyButton from './UI/MyButton';
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
                    className={isAuthenticated ? "exitButton" : "hidden"}>
                    { "Выйти" } 
                </ MyButton>
            </div>
        </header>
    );
};

export default Header;
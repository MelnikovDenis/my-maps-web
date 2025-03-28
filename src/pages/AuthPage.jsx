import React from 'react';
import Header from '../components/Header';
import AuthForm from '../components/Forms/AuthForm';

const AuthPage = () => {
    return (
        <div className='container'>
            
            <Header />

            <div className='auth'>
                <div className='auth__inner'>
                    
                    <AuthForm />

                </div>               
            </div>

        </div>
    );
};

export default AuthPage;
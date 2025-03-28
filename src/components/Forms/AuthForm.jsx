import React, { useState } from 'react';
import MyInput from '../MyInput';
import MyButton from '../MyButton';
import { useFetching } from '../../hooks/useFetching';
import MyMapApi from '../../http/MyMapApi';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [ auth, isAuthLoading] = useFetching(async () => {
        var response = await MyMapApi.loginOrRegister(login, password);

        if(response.data?.isSuccess) {
            setToken(response.data.data);

            navigate("/main")
        }
    });

    const onSubmit = () => {
        auth().catch(authError => {
            console.log(authError);
            if(authError?.response) {
                if(authError.response?.status === 401) {
                    setError("Неверный логин или пароль");
                } else if (authError.response?.status === 400) {
                    setError("Пароль должен содержать минимум 6 символов");
                } else {
                    setError("Внутренняя ошибка сервера");
                }            
            } else if(authError?.request) {
                setError("Сервер не отвечает");
            } else {
                setError("Неизвестная ошибка");
            }
        });       
    };

    return (
        <div className='authForm'>
            <div className='authForm__inner'>

                <div className='authForm__title'>
                    Вход/Регистрация
                </div>

                <div className='errors__wrapper'>
                    <div className='error__text'>
                        { error }
                    </div>
                </div>

                <div className='input__wrapper'>
                    <MyInput value={login} 
                        setValue={setLogin} 
                        type='text'
                        placeholder='Логин' />
                </div>

                <div className='input__wrapper'>
                    <MyInput value={password} 
                        setValue={setPassword} 
                        type='password'
                        placeholder='Пароль'  />
                </div>

                <div className='button__wrapper'>
                    <div className='button__wrapper__inner'>
                        <MyButton onClick={onSubmit} 
                            text={!isAuthLoading ? "Войти" : "Загрузка..."} 
                            className={!isAuthLoading ? 'myButton' : 'myButton__inactive'}
                            disabled={ isAuthLoading }
                            />
                    </div>                    
                </div>
                
            </div>
        </div>
    );
};

export default AuthForm;
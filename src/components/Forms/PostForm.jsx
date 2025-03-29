import React, { useState } from 'react';
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';
import { useFetching } from '../../hooks/useFetching';
import MyMapApi from '../../http/MyMapApi';  
import MyModal from '../UI/MyModal';
import ErrorContent from '../ErrorContent';
import MyLoader from '../UI/MyLoader';

const PostForm = ({ post, setPost, posts, setPosts }) => {
    const [error, setError] = useState(null);
    const [ create, isCreateLoading] = useFetching(async () => {
        const response = await MyMapApi.createPost(post);

        if(response.data?.isSuccess) {
            setPost({ 
                longitude: "не задано",
                latitude: "не задано",
                commentary: ""
            });

            setPosts([ ...posts, response.data.data]);
        }
    });

    const onCommentaryChanged = (newValue) => {
        setPost({...post, commentary: newValue});
    }

    const onSubmit = () => {
        create().catch(createError => {
            if(createError?.response) {
                if(createError.response?.status === 401) {
                    setError("Неверный токен авторизации");
                } else if (createError.response?.status === 400) {
                    setError("Поставьте точку и заполните поле с комментарием");
                } else {
                    setError("Внутренняя ошибка сервера");
                }            
            } else if(createError?.request) {
                setError("Сервер не отвечает");
            } else {
                setError("Неизвестная ошибка");
            }
        });
    }

    return (
        <React.Fragment>
            {
                isCreateLoading && <MyLoader />
            }

            <MyModal message={error} 
                visible={!error} 
                setVisible={(value) => !value && setError("")}>
                    <ErrorContent error={error} 
                        onExit={(value) => !value && setError("")}/>
            </MyModal>

            <div className='postForm'>            
                <div className='postForm__inner'>

                    <div className='coordinate__wrapper'>
                        { 
                            `Широта: ${
                                Number.isFinite(post.latitude) ? 
                                    post.latitude.toFixed(4) : 
                                    post.latitude
                                }` 
                        }
                    </div>

                    <div className='coordinate__wrapper'>
                        { 
                            `Долгота: ${
                                Number.isFinite(post.longitude) ? 
                                    post.longitude.toFixed(4) : 
                                    post.longitude
                            }` 
                        }
                    </div>                

                    <div className='input__wrapper'>
                        <MyInput value={post.commentary} 
                            setValue={onCommentaryChanged} 
                            type='text'
                            placeholder='Комментарий' />
                    </div>

                    <div className='button__wrapper'>
                        <div className='button__wrapper__inner'>
                            <MyButton onClick={onSubmit} 
                                className={!isCreateLoading ? 'myButton' : 'myButton__inactive'}
                                disabled={ isCreateLoading }>
                                {!isCreateLoading ? "Создать" : "Загрузка..."}
                            </MyButton>
                        </div>                    
                    </div>

                </div>
            </div>
        </React.Fragment>        
        
    );
};

export default PostForm;
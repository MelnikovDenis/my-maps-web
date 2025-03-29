import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MyMap from '../components/MyMap';
import PostForm from '../components/Forms/PostForm';
import { useFetching } from '../hooks/useFetching';
import MyMapApi from '../http/MyMapApi';
import MyLoader from '../components/UI/MyLoader';
import MyModal from '../components/UI/MyModal';
import ErrorContent from '../components/ErrorContent';

const MainPage = () => {
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({ 
        longitude: "не задано",
        latitude: "не задано",
        commentary: ""
    });

    // добавить отображение лоадера
    const [get, isGetLoading] = useFetching(async () => {
        const response = await MyMapApi.getPosts();
        
        if(response.data?.isSuccess) {
            setPosts([ ...response.data.data ]);
            setError("");
        }
    });

    useEffect(() => {
        get().catch(getError => {
            if(getError?.response) {
                if(getError.response?.status === 401) {
                    setError("Неверный токен авторизации");
                } else {
                    setError("Внутренняя ошибка сервера");
                }            
            } else if(getError?.request) {
                setError("Сервер не отвечает");
            } else {
                setError("Неизвестная ошибка");
            }
        });
    }, []);

    return (
        <React.Fragment>
            {
                isGetLoading && <MyLoader />
            }

            <MyModal message={error} 
                visible={!error} 
                setVisible={(value) => !value && setError("")}>
                    <ErrorContent error={error} 
                        onExit={(value) => !value && setError("")}/>
            </MyModal>
            
            <div className='container'>
                

                <Header />

                <div className='main'>
                    <div className='main__inner'>
                        <div className='postForm__wrapper'>
                            <PostForm post={post} setPost={setPost} posts={posts} setPosts={setPosts}/>
                        </div>

                        <div className='map__wrapper'>
                            <MyMap post={post} setPost={setPost} posts={posts} setPosts={setPosts}/>
                        </div>
                    </div>               
                </div>

            </div>
        </React.Fragment>
        
    );
};

export default MainPage;
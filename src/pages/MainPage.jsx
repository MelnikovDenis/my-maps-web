import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MyMap from '../components/MyMap';
import PostForm from '../components/Forms/PostForm';
import { useFetching } from '../hooks/useFetching';
import MyMapApi from '../http/MyMapApi';

const MainPage = () => {
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
        }
    });

    useEffect(() => {
        get();
    }, []);

    return (
        <div className='container'>

            <Header />

            <div className='main'>
                <div className='main__inner'>
                    <div className='postForm__wrapper'>
                        <PostForm post={post} setPost={setPost} posts={posts} setPosts={setPosts}/>
                    </div>

                    <div className='map__wrapper'>
                        <MyMap post={post} setPost={setPost} posts={posts}/>
                    </div>
                </div>               
            </div>

        </div>
    );
};

export default MainPage;
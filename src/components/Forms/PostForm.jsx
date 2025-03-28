import React from 'react';
import MyInput from '../MyInput';
import MyButton from '../MyButton';
import { useFetching } from '../../hooks/useFetching';
import MyMapApi from '../../http/MyMapApi';  

const PostForm = ({ post, setPost, posts, setPosts }) => {
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
        // Добавить обработку ошибок
        create();
    }

    return (
        <div className='postForm'>            
            <div className='postForm__inner'>

                <div className='coordinate__wrapper'>
                    { `Долгота: ${post.longitude}` }
                </div>

                <div className='coordinate__wrapper'>
                    { `Широта: ${post.latitude}` }
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
                            text={!isCreateLoading ? "Создать" : "Загрузка..."} 
                            className={!isCreateLoading ? 'myButton' : 'myButton__inactive'}
                            disabled={ isCreateLoading }
                            />
                    </div>                    
                </div>

            </div>
        </div>
    );
};

export default PostForm;
import React from 'react';
import MyButton from './UI/MyButton';

const PostContent = ({ post, onDelete }) => {
    return (
        <div className='postContent'>
            <div className='postContent__inner'>

                <div className='postCommentary__wrapper'>
                    { `"${post.commentary}"` }
                </div>

                <div className='postAuthor__wrapper'>
                    { `Автор: ${post.name}` }
                </div>

                <div className='postCoordinate__wrapper'>
                    {`[${post.latitude.toFixed(4)}, ${post.longitude.toFixed(4)}]`}
                </div>

                <div className='postButton__wrapper'>
                    <MyButton className="deleteButton" onClick={onDelete}>
                        { "Удалить" }
                    </MyButton>
                </div>

            </div>
        </div>
    );
};

export default PostContent;
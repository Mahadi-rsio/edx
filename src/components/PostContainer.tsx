import React from 'react';
import GroupSuggetionCard from './GroupSuggestion';
import Post from './Post';
import { posts } from './data.json';


const PostContainer: React.FC = () => {
    return (
        <>
            <GroupSuggetionCard />
            {posts.map((post) => (
                <Post
                    postId='1234'
                    username={post.userName}
                    likeCount={0} 
                    content={post.content}
                    timestamp='12 jun 2023'
                    commentCount={12}
                    hashtags={post.tags}
                    avatarUrl=''
                    imageUrl=''
                    />
            ))}
        </>
    );
};

export default PostContainer;

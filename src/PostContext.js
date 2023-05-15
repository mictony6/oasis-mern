import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const updatePost = (postId, updatedData) => {
    setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
        post.post_id === postId ? { ...post, ...updatedData } : post
    );
        return updatedPosts;
    });
    };

    useEffect(() => {
    // Update the posts context whenever the posts state changes
    setPosts(posts);
    }, [posts]);

    return (
    <PostContext.Provider value={{ posts, updatePost }}>
        {children}
    </PostContext.Provider>
    );
};

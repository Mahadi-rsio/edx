import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    collection,
    getDocs,
    query,
    limit,
    orderBy,
    startAfter,
    QueryDocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import GroupSuggetion from './GroupSuggestion';
import Post from './Post';
import { db } from './../ts/app';
import { CircularProgress, Button, Typography } from '@mui/material';

interface PostData {
    id: string;
    userName: string;
    likeCount?: number;
    content: string;
    timestamp?: string;
    commentCount?: number;
    tags?: string[];
    avatarUrl?: string;
    imageUrl?: string;
}

const POSTS_BATCH_SIZE = 2;

const PostContainer: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // To keep track of the last visible document for pagination
    const lastVisibleDocRef =
        useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

    const fetchPosts = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            let postsQuery;
            if (lastVisibleDocRef.current) {
                postsQuery = query(
                    collection(db, 'posts'),
                    orderBy('timestamp', 'desc'),
                    startAfter(lastVisibleDocRef.current),
                    limit(POSTS_BATCH_SIZE),
                );
            } else {
                postsQuery = query(
                    collection(db, 'posts'),
                    orderBy('timestamp', 'desc'),
                    limit(POSTS_BATCH_SIZE),
                );
            }
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as PostData[];

            if (snapshot.docs.length > 0) {
                lastVisibleDocRef.current =
                    snapshot.docs[snapshot.docs.length - 1];
            }
            // If fewer posts were returned than expected, there are no more posts
            if (snapshot.docs.length < POSTS_BATCH_SIZE) {
                setHasMore(false);
            }
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        } finally {
            setLoading(false);
        }
    };

    // IntersectionObserver for infinite scroll
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchPosts();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

    // Initial fetch
    useEffect(() => {
        fetchPosts();
        // Clean up the observer on unmount
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    // Common centered style
    const centerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        flexDirection: 'column',
    };

    return (
        <>
            <GroupSuggetion />
            {/* When there are no posts after initial load */}
            {posts.length === 0 && !loading && !error && (
                <div style={centerStyle}>
                    <p style={{ fontSize: '0.9rem' }}>No posts available</p>
                </div>
            )}
            {/* Render posts */}
            {posts.map((post, index) => {
                if (index === posts.length - 1) {
                    return (
                        <div ref={lastPostRef} key={post.id}>
                            <Post
                                postId={post.id}
                                username={post.userName}
                                likeCount={post.likeCount || 0}
                                content={post.content}
                                timestamp={
                                    post.timestamp
                                        ? new Date(
                                              post.timestamp,
                                          ).toLocaleDateString()
                                        : ''
                                }
                                commentCount={post.commentCount || 0}
                                hashtags={post.tags || []}
                                avatarUrl={post.avatarUrl || ''}
                                imageUrl={post.imageUrl || ''}
                            />
                        </div>
                    );
                }
                return (
                    <Post
                        key={post.id}
                        postId={post.id}
                        username={post.userName}
                        likeCount={post.likeCount || 0}
                        content={post.content}
                        timestamp={
                            post.timestamp
                                ? new Date(post.timestamp).toLocaleDateString()
                                : ''
                        }
                        commentCount={post.commentCount || 0}
                        hashtags={post.tags || []}
                        avatarUrl={post.avatarUrl || ''}
                        imageUrl={post.imageUrl || ''}
                    />
                );
            })}
            {/* Loading indicator */}
            {loading && (
                <div style={centerStyle}>
                    <CircularProgress size={24} />
                </div>
            )}
            {/* Error message with retry option */}
            {error && (
                <div style={centerStyle}>
                    <Typography color="error" sx={{ mt: 1 }}>
                        Something went wrong
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchPosts}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </div>
            )}
            {/* Display "No more posts" only if there are already some posts */}
            {!hasMore && posts.length > 0 && !loading && (
                <div style={centerStyle}>
                    <p style={{ fontSize: '0.9rem' }}>No more posts</p>
                </div>
            )}
        </>
    );
};

export default PostContainer;



'use client'
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation'


const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // for refresh the page after db updated
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // fetch the API route to connect to db and submit the 'POST' request to db
        const server_end_url = '/server/add-post'
        try {
           await fetch(server_end_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify({title, content}), 
           })
            // await fetch to make sure it is done, then refresh the page so that newly added post can be shown 
           router.refresh()

        } catch (error) {
            console.error('Error during POST request:', error.message);
            // Handle the error, e.g., show a user-friendly message or log it for debugging
        }
        
        setTitle('')
        setContent('')
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label className={styles.label} htmlFor="title">
                        Title
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label className={styles.label} htmlFor="content">
                        Content:
                    </label>
                    <textarea
                        className={styles.input}
                        type="text"
                        id="content"
                        value={content}
                        rows={10}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                {/* TODO: add published to db */}
                <div className={styles.group}>
                    <label className={styles.label} htmlFor="published">
                        Publish Immediately?
                    </label>
                    <input type="radio" id="publish" name="check_publish" value="publish" />
                    <label for="html">publish</label>
                    <input type="radio" id="draft" name="check_publish" value="draft" />
                    <label for="css">draft</label>
                </div>
                <button className={styles.button} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;

'use client'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
//  how to pass title and content to the form : context? 
function UpdateForm(params) {

    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    function handleSubmit() {
        pass
    }
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
              <button className={styles.button} type="submit">
                  Submit
              </button>
          </form>
        
    </div>
  )
}

export default UpdateForm

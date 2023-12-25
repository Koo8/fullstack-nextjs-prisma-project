// for route  /add-posts


import React from 'react'
import styles from '@/app/page.module.css'
import MyForm from '../components/PostForm'
import Link from 'next/link'

function page() {
  return (
    <div className={styles.main}>
      <Link href={'/'}>Back to posts</Link>
          <h2>Add a post</h2>
          <MyForm />
    </div>
  )
}

export default page

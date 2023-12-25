// for route /update-post/id

import React from 'react'
import styles from '@/app/page.module.css'
import UpdateForm from '@/app/components/UpdateForm'
import Link from 'next/link'

function page({params}) { // {params} not just params
    const id = params.id // id is from the url 'update-post/${id} in file system
  return (
      <div className={styles.main}>
          <Link href={'/'}>Back to posts</Link>
          <h2>Update post</h2>
          <UpdateForm postid={id} />
      
    </div>
  )
}

export default page

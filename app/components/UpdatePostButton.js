'use client'

import styles from '@/app/page.module.css'
import Link from 'next/link';

function UpdatePostButton({postid, title, content}) {

  return (
      <button className={styles.updatebutton} >
          <Link href={`/update-post/${postid}`}>
              Update
          </Link>
      </button>
  )
}

export default UpdatePostButton

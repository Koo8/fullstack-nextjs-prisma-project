// server side rendering - nextjs 13: read db is rended on server side
// home page route

import Link from 'next/link'
import styles from './page.module.css'
import prisma from '@/lib/prisma'
import DeletePostButton from './components/DeletePostButton'
import UpdatePostButton from './components/UpdatePostButton'


// 
async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    // author is from user table, include into this post result
    include: {
      author: {
        select: { name: true }
      }
    }
  })
  return posts
}
export default async function Home() {

  const posts = await getPosts()

  
  return (
    <main className={styles.main}>
      <Link href={'/add-posts'}>add a new post</Link>
      <h1 style={{ margin: '1rem' }}>Feed</h1>
      {posts.map(p => {
        return (
          <div className={styles.post} key={p.id}>
            <h3>{p.title}</h3>
            <small><i>author: {p.author.name}</i></small>
            <p>{p.content}</p>
            {/* THIS FOLLOWING IS NOT POSSIBLE! this is a server file NOT front end client file SEE README*/}
            {/* <button id={p.id} onClick={deletepost(id)}>Delete</button> */}
            {/* TO open a hole for client file to work in server side */}
            <div style={{ display: 'flex', gap:' 1rem', marginTop: '5px'}}>
              <DeletePostButton  postid={p.id} />
              <UpdatePostButton postid={p.id} title={p.title} content={p.content} />
            </div>
           

          </div>
        )
        
      })}
    </main>
  )
}

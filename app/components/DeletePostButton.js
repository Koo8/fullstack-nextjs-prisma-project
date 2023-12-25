'use client'

import { useRouter } from "next/navigation"
import styles from '@/app/page.module.css'

function DeletePostButton({ postid }){
    
    const server_delete_url = `/server/delete/${postid}` // dynamic url -> postid passed as params
    const router = useRouter()


    async function deletePost() {
        try {
            await fetch(server_delete_url, {
                method: 'DELETE',
            })
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button className={styles.deletebutton} onClick={deletePost}>Delete</button>
            
      </>
    
  )
}

export default DeletePostButton

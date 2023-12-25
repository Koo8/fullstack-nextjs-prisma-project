// route handler for route /server/add-post endpoint

import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// receive request from client side, post it to the server 
// check network updates from google inspect tool

export async function POST(request) {
    // await is MUST, DONT forget
    const { title, content } = await request.json()  
    // add to db
    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            author: {
                create: { name: 'a hard-coded user' }
            }
        }
       
    })
    return NextResponse.json(result)
 }

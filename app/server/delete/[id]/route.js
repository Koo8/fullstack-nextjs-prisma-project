import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) { // since this is a dynamic route with [id], { params } should be added to pass this variable
    
    const id = params.id
    const post = await prisma.post.delete({
        where: {id}
    })
    return NextResponse.json(post)

 }
// this lib is for creating the only prisma client for query to db in vercel
// make sure only one client instance is created
// In JavaScript, there's always a global object defined. Scripts running under Node.js have an object called global as their global object.
//The globalThis global property allows one to access the global object regardless of the current environment( either window, worker or node.js), see prisma doc.
// https://stackoverflow.com/questions/69427050/how-to-extend-globalthis-global-type for typescript with nextjs

import { PrismaClient } from '@prisma/client'

let prisma; // var create global variables, let and const nevery create global variables

if (process.env.NODE_ENV == 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma;

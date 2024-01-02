This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Next+Prisma+Project - vercel deployment
#### npx create-next-app@latest
* select No for all options except App Route
#### first - push to github
* commands:
    - git add .
    - git commit -m 'initial commit'
    - set up new repo, copy/paste last two lines 
        * git remote add origin https://github.com/mygithub/fullstack-nextjs-prisma-project.git
        * git push ( git push --set-upstream origin master)
#### second - connect to vercel
* create new project that linked to this github repo
* in vercel storage, create new postgres db if not created yet. 
* install vercel CLI: npm i -g vercel@latest
* vercel env pull .env
* after prompted: vercel link
* if need to change to other project, use vercel link again for new link to vercel project
* vercel env pull .env.local (.env instead)

#### install prisma
* *npm i prisma --save-dev* ==> It is recommended to always install the prisma package as a development dependency, using npm install prisma --save-dev, to avoid versioning conflicts.
* add schema.prisma file -> the tables content is from vercel guide nextjs prisma postgress doc example for schema.prisma - this file includes *generator client* for specifying prisma client and its location. See file *shcema.prisma*
* *npx prisma db push* -> this command is to create db using env variables and schema from schema.prisma:
    - this is what happened in terminal: 
        * Environment variables loaded from .env
        * Prisma schema loaded from schema.prisma
        * Datasource "db": PostgreSQL database "verceldb", schema "public" at "ep-weathered-bush-astringofnumber.us-east-1.postgres.vercel-storage.com"
    - this is what happened in vercel storage:
        * in data tab, the models from schema is loaded to vercel
        * data query can be done at vercel/ or through prisma studio gui interface
* *npx prisma studio* : open up the interface for view prisma db -> Prisma Studio is up on http://localhost:5555 after load data from .env and schema


#### seed db using prisma studio 
* *npx prisma studio* : open up the interface for view prisma db -> Prisma Studio is up on http://localhost:5555 after load data from .env and schema
* new added record is simultaneously updated in vercel storage.

#### interact with prisma ORM with prisma client
* *npm i @prisma/client* -> auto-generated prisma query builder
* *npx prisma generate* -> so that prisma client can load data from .env and schema, then with the following code
    - *import { PrismaClient } from '@prisma/client'*
    - *const prisma = new PrismaClient()*
   Client is for using `prisma` in your application to read and write data in your DB
   - !Important: You need to re-run the prisma generate command after every change that's made to your Prisma schema to update the generated Prisma Client code.
* application should generally only create one instance of PrismaClient. more from https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration
* To re-use a single instance of client, create a module that exports a PrismaClient object :* /lib/prisma.js.* The client object is cached the first time the module is imported. Subsequent requests return the cached object rather than creating a new PrismaClient -> 
    - *import prisma from './client'*
    - *async function main() {*
        *const allUsers = await prisma.user.findMany()*
        *}*
    - *main()*
* Prevent hot reloading from creating new instances of PrismaClient by storing PrismaClient as a global variable in development environments only, as global variables are not reloaded. SEE code in *lib/prisma.js*
* use client in the app to query the db - *'/app/page.js*

#### create a folder with 'page.js' for a route for frontend user to update post
* 'use client' on top
* this page can call API endpoints to connect to server side db
* folder 'add-posts' is the subroute '/add-posts', with 'page.js' inside the folder
* fetch the server side endpoint here to "POST" request

#### create server folder with 'route.js' route handler
* async / await to get the request
* post to db using prisma.post.create({}) (post is the model)
* dynamic route use [id], see the server endpoint of /server/delete/[id], for this *export async function DELETE* function has to have a { params } parameter.

#### refresh page 
* useRouter from next/navigation, useRouter().refresh()

#### Client side BUTTON in server side file
* since server file can't have a user-interactive button for delete, create a seperate button component and embed it into server file. It is allowed to open up a hole for a small frontend component to be added to the server file
* create a delete button component, 'use client', use fetch to reach delete server endpoint to request delete
* create a server delete {id} end point


#### update post function
* create UpdatePostButton, placed in the route 'update-post/[id]/page.js'. 
* TODO **the updated post's title and content CAN NOT be passed to update form page**

#### allow user to decided to publish or draft a post


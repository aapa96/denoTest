import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {login, auth, test} from './routes.ts'
import authMiddleware from './auth.ts';
import { addUser,getUser,getUsers,deleteUser,updateUsers } from "./controller.ts";

const router = new Router();

router
  .post('/login', login)
  .get('/test', test)
  .get('/auth', authMiddleware,  auth)
  .post('/addUser',authMiddleware, addUser)
  .get('/getUser/:id',authMiddleware,getUser)
  .get('/getUsers',authMiddleware,getUsers)
  .delete('/deleteUser/:id',authMiddleware,deleteUser)
  .put('/updateUsers/:id',authMiddleware,updateUsers)
  ;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port: 8000});
console.log("Started on port: 8000");
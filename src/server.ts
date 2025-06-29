import express, { Request, Response } from 'express';
import router from './router'
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();
app.use(express.json()); // ✅ Important!
app.use(express.urlencoded({extended: true}))

app.use('/api' ,protect , router)
app.post('/user', createNewUser)
app.post('/signin', signin)


app.use((e,req,res,next) => {
    if(e.type === 'auth') { res.status(401).json({message: 'auth problem'})}
else if(e.type === 'input') {res.status(400).json({message: 'input problem'})} else {res.status(500).json({message: 'the problem is from us'})}
}) 

export default app; 

import prisma  from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

/* Register function */
export const createNewUser = async (req,res, next) => {
    try {const hash = await hashPassword(req.body.password);
    const name = req.body.username

    const user = await prisma.user.create({
        data:{
            username: name,
            password: hash
        }
    })

    const token = createJWT(user)
    res.json({token: token}) }
    catch(error) { error.type = 'input' , next(error)}
}

/* SignIn function */
export const signin = async (req,res) => {

if(!req.body.username || !req.body.password) {res.status(400) ; res.send("Missing username or password ! ") ; return ;}

    const user = await prisma.user.findUnique({
        where: {username: req.body.username}
    })

    if(!user) {res.status(401)
        res.send('User unavailable')
        return
    }

const isValid = await comparePasswords(req.body.password , user.password)

if(!isValid) { res.status(401)
    res.send("Invalid password, try again ! ")
return
}

const token = createJWT(user)
res.json({token:token})


}
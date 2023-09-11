import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthUserRequest{
  email: string;
  password: string;
}

class AuthUserService{
  async execute({email, password}: AuthUserRequest){

    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }, 
      //include:{ -> não criado
        //subscriptions: true,
      //}
    })

    if(!user){
      throw new Error("Email/password incorrect")
    }

    const passwordMatch = await compare(password, user?.password)

    if(!passwordMatch){
      throw new Error("Email/passwor incorrect")
    }

    const token = sign(
      {
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET, // Use the JWT secret directly
  
    {
      subject: user.id.toString(),
      expiresIn: '30d'
    }
  )

  return{
    id: user?.id,
    name: user?.name,
    email: user?.email,
    endereco: user?.endereco,
    token: token,
  }

  }
}

export { AuthUserService }
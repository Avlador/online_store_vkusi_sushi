const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/registr', async(req, res) =>{
const {login, email, pasword} = req.body;
    try{
        const regUser =  await prisma.user.findUnique({
            where: {email: email}
        });
        if(regUser){
            console.log('email уже занят')
            return res.status(400).json({message: 'Пользователь с таким '})
        };

        const newUser = await prisma.user.create({
            data:{
                login: login,
                email: email,
                pasword: pasword,
            }
        });
        res.status(200).json({ message: "Регистрация успешна!" });
    }catch(error){
        console.log('Ошибка сервера при регистрации');
        res.status(500).json({message:'Внутренняя ошибка сервера, это конец :('})
        
    }

})
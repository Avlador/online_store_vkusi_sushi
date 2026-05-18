require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { join } = require('@prisma/client/runtime/library');
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Доступ запрещен. Вы не авторизованы." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Токен недействителен или истек." });
        }
                req.user = user;
        next();
    });
};

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
                password: pasword,
            }
        });
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: "Регистрация успешна!", token: token });
    }catch(error){
        console.log('Ошибка сервера при регистрации');
        res.status(500).json({message:'Внутренняя ошибка сервера, это конец :('})
        
    }
    

})

app.get('/api/menu', async(req, res) =>{
    try{
        const menuItems = await prisma.menuItem.findMany();
        console.log('меню отправлено на фронт');
        res.status(200).json(menuItems);
        
    }catch(error){
        console.log('Ошибка при получении меню', error);
        res.status(500).json({message:'Ошибка сервера при загрузке меню'})
        
    }
});



app.post('/api/login', async(req, res) => {
    const {email, pasword} = req.body;

    try{
        const  user = await prisma.user.findUnique({
            where:{email: email}
        });
        if(!user){
            console.log('Такого пользователя несуществует');
            return res.status(400).json({message:'Пользователь с таким email не найден'})
        }

        if(user.password !== pasword){
            console.log('Неверный пароль');
            return res.status(400).json({message:'Пароль неверный'})
            
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        console.log(`Пользователь ${user} успешно вошел в аккаунт!`);
        res.status(200).json({
            message:'Вход успешен',
            login:user.login,
            email: user.email,
            token: token
        })
        
    }catch(error){
        console.log('Ошибка сервера при входе');
        
    }
})


app.post('/api/orders', authenticateToken, async (req, res) => {
    const { items, totalPrice } = req.body;
    
    const userId = req.user.id;

    try {
        const newOrder = await prisma.order.create({
            data: {
                totalPrice: totalPrice,
                userId: userId,
                items: {
                    create: items.map(item => ({
                        menuItemId: Number(item.id), 
                        quantity: item.quantity
                    }))
                }
            }
        });

        console.log(`Заказ №${newOrder.id} успешно оформлен!`);
        res.status(200).json({ message: "Заказ успешно оформлен!", orderId: newOrder.id });

    } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        res.status(500).json({ message: "Ошибка сервера при оформлении заказа" });
    }
});

app.listen(PORT, () =>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    
});
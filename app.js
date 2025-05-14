const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3002;

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://idukke.xyz'] 
  : ['http://localhost:3002']; 

  app.use(cors({
  origin: allowedOrigins
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }  
app.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    
    if(password.length < 4){
      res.status(201).json({ message: 'La contraseña debe tener mínimo 4 caracteres' });
    }
    // Leer usuarios actuales
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    
    // Verificar usuario
    const user = users.find(u => u.username === username && u.email === email && u.password === password);
    if(user){
      return res.status(401).json({message: 'El usuario ya existe'})
    }

    // Agregar nuevo usuario
    //TODO: Encriptar contraseña
    users.push({ username, email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  
    // Respuesta
    res.status(201).json({ message: 'Usuario registrado correctamente' });
} )

app.post('/login', (req, res) => {
  const {username, password} = req.body;

  // Leer usuarios actuales
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

  // Verificar usuario
  const user = users.find(u => u.username === username && u.password === password);
  if(!user){
    return res.status(401).json({message: 'Usuario o contraseña incorrectos'})
  }
  // Respuesta
  res.status(201).json({ message: `${username} ha iniciado sesión` });
} )

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});
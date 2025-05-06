const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
const USERS_FILE = path.join(__dirname, 'users.json');


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }  
app.post(register, (req, res) => {
    const {username, email, password} = req.body;
} )

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});

/*
ssh u3002@95.111.234.50
clave: 3002
95.111.234.50*/ */


//git clone 'url a desplegar'
//npm install

//contabo.com
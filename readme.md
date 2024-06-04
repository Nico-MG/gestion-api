# Gestion API

Se busca independizar los procesos

## nombre_tabla.model.js

es donde se ejecuta la  base de datos

## services

es donde se trabajaran los datos para pasarselo a la db pero desde model.js

## nombre_tabla.controller.js

es donde se reciben los datos externos y se pasan a services

## Idea de como meter una imagen a la base de datos

```js
const fs = require('fs');

// Leer la imagen desde el sistema de archivos
const imagePath = 'path/to/your/image.jpg';
const imageBuffer = fs.readFileSync(imagePath);

// Convertir la imagen a base64
const imageBase64 = imageBuffer.toString('base64');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveImage() {
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      profilePic: imageBase64, // Guardar la imagen codificada en base64
    },
  });
  console.log(newUser);
}

saveImage().catch(e => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getImage(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profilePic: true },
  });
  return user.profilePic;
}
const base64ToBuffer = (base64) => Buffer.from(base64, 'base64');

const express = require('express');
const app = express();
const port = 3000;

app.get('/user/:id/profile-pic', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const base64Image = await getImage(userId);

  if (base64Image) {
    const imgBuffer = base64ToBuffer(base64Image);
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
  } else {
    res.status(404).send('Image not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

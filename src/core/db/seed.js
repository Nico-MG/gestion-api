import {faker} from '@faker-js/faker'
import db from './connection.js'

function randomProvider() {
    return {
        rut_proveedor: faker.string.numeric(9),
        nombre: faker.person.firstName(),
        direccion: faker.location.secondaryAddress(),
        numero: faker.string.numeric(9),
        tipo: faker.commerce.department()
    }
}

// en proceso
db.proveedor.create({data: randomProvider()})
db.producto.findUnique({
    omit: {
        categoria: true
    }
    
})
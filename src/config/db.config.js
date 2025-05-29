
import mongoose from 'mongoose'
import { ENVIRONMENT } from '../environment.js'

//Configurar la conexion con mi DB en mongoDB

export const connectDB = async () => {
    try{
        await mongoose.connect(
            `${ENVIRONMENT.DB_URL}/${ENVIRONMENT.DB_NAME}`
        )
        console.log('Conexion exitosa')
    }
    catch(error){
        console.error('Error al conectarse:', error)
    }
}

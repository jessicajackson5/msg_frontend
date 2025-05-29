import dotenv from 'dotenv' //import default
/* import { config } from 'dotenv' */ //import normal y me traigo especificamente al metodo config

//Esto carga las variables de entorno en la variable process.env
dotenv.config()

export const ENVIRONMENT = {
    API_KEY: process.env.API_KEY,
    GMAIL: process.env.GMAIL,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}
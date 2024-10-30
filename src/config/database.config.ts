import { registerAs } from "@nestjs/config";

export default registerAs('database',()=>({
    host: process.env.Database_HOST || 'localhost', 
    port: parseInt(process.env.Database_PORT) || 5432,
    user: process.env.Database_USER,
    password: process.env.Database_PASSWORD,
    name: process.env.Database_NAME,

    synchronize: process.env.Database_SYNC === 'true'?true:false,   //typeorm auto synchronises to database so to stop this in productionwe use this 
    autoLoadEntities:process.env.Database_AUTOLOAD === 'true'?true:false,
}))
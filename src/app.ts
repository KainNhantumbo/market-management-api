import express, { Application, Response, Request } from 'express';
import { config } from 'dotenv';

config()

const app: Application = express()
const PORT =  process.env.PORT

app.get('/', (req: Request, res: Response)=> {
  res.json({name: 'tar'})
})

app.listen(PORT, ()=> {
 console.log('Hello')
})

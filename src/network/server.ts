import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { applyRoutes } from './router'
const PORT = 3000;

class Server{
  private _app: express.Application;

  constructor() { 
    this._app = express();
    this.config();
    this.routes();
  }

  private config() {
    this._app.use(morgan('dev'));
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended   : false }));
    this._app.use(cors())
    this._app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        next()
      }
    )
    applyRoutes(this._app)
  }

  private routes(){
    this._app.get('/', (req, res) => {res.send("Server2")});
  }

  private async _sequelize(): Promise<void> {
    try {
        const uri = "mongodb+srv://Hasser:v4quVbwB7TDLN@cluster0.4jglo.mongodb.net/?retryWrites=true&w=majority";
        // Connect to the MongoDB cluster
        mongoose.connect(
            uri,
          () => console.log(" Mongoose is connected")
        );
    
      // console.log('Database connection established')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message)
      process.exit(1)
    }
  }

  public start(): void {
    this._app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`)
    })
    try {
      this._sequelize()
    } catch (e) {
      console.error(e)
    }
  }

}
const server = new Server()


export { server as Server }

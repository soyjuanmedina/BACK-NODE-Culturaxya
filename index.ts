// import needed libraries
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes';
import cors from 'cors';

// get express application
const app = express();
// body parser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);
// define app port
const port = process.env.PORT || 3000;
// starts the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
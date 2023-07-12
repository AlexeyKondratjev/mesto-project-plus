import { DB_PATH } from './constants/constants';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { tempAuth } from './middleware/tempAuth';
import { errorHandler } from './middleware/errorHandler';



const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(tempAuth);

app.use(router);

app.use(errorHandler);

const initDBConnect = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(DB_PATH);
    console.log(`Соединение с базой данных установлено!`);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}.`);
    });
  } catch (err) {
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      console.log('Возникла ошибка подключения к базе данных!');
    } else {
      console.log('Возникла ошибка запуска сервера: ', err);
    }
  }
};


initDBConnect();
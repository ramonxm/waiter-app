import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';


mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(router);
    app.listen(3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  }).catch(() => {
    console.log('Erro ao se conectar');
  });

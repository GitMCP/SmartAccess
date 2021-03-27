import express from 'express';
import Router from './routes/index';

import './database';

const app = express();
app.use(Router);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});

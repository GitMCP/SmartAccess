import express from 'express';
import Router from './routes/index';

const app = express();
app.use(Router);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});

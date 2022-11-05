import express from 'express';
import morgan from 'morgan';

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

const handleListening = () => console.log('server is listening');

app.listen(PORT, handleListening);

app.use(logger);
app.use('/', globalRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);

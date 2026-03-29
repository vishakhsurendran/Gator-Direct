import 'dotenv/config'
import express from 'express';
import health from './routes/health';
import buildings from './routes/buildings';
import imp from './routes/import';
import routing from './routes/routing';

const app = express();
app.use(express.json());

app.use('/health', health);
app.use('/buildings', buildings);
app.use('/import', imp);
app.use('/routing', routing);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import health from './routes/health';
import buildings from './routes/buildings';
import imp from './routes/import';
import routing from './routes/routing';
import rooms from './routes/rooms';

const app = express();

// Connect the React dev server (localhost:3000) and the API
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.sendStatus(200); return; }
  next();
});

app.use(express.json());

app.use('/health',    health);
app.use('/buildings', buildings);
app.use('/import',    imp);
app.use('/routing',   routing);
app.use('/rooms',     rooms);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));

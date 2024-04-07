import express from 'express';
import { Client } from '@notionhq/client';
import cors from 'cors';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const apiKey = "secret_GY8z5TD5czqmaXpXnzJml72ymzga";
const databaseId = 'a1f0ac2a58c742cc97eff21cb1893b50';
const client = new Client({ auth: apiKey });

app.listen(PORT, HOST, () => {
    console.log("Starting proxy at " + HOST + ":")
})

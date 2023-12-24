import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyparser from 'body-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/blog.html', (req, res) => {
    res.sendFile(__dirname + '/public/blog.html');
});
app.post('/submit', (req, res) => {
    console.log(req.body);
});
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});
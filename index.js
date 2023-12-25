import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyparser from 'body-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let blogPosts = []; // This array will store your blog posts

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/blog', (req, res) => {
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.post('/submit', (req, res) => {
    const { name, title, blogtext } = req.body;
    blogPosts.push({ name, title, blogtext });
    res.redirect('/blog');
});


app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});

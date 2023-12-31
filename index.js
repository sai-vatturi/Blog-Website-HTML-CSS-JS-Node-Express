import {} from 'dotenv/config'
import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbURI = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const blogSchema = new mongoose.Schema({
    name: String,
    title: String,
    blogtext: String,
    date: { type: Date, default: Date.now }
});
 
const BlogPost = mongoose.model('BlogPost', blogSchema);  

app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Include method-override
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/blog', (req, res) => {
    BlogPost.find()
      .then(blogPosts => res.render("index.ejs", { blogPosts }))
      .catch(err => console.error(err));
  });
  

app.post('/submit', (req, res) => {
    const { name, title, blogtext } = req.body;
    const newBlogPost = new BlogPost({ name, title, blogtext });
  
    newBlogPost.save()
      .then(() => res.redirect('/blog'))
      .catch(err => console.error(err));
  });
  
app.delete('/blog/:id', (req, res) => {
    const postId = req.params.id;
    BlogPost.findOneAndDelete({ _id: postId })
        .then(() => res.redirect('/blog'))
        .catch(err => console.error(err));
});


app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});

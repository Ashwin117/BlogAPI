'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const stormpath = require('express-stormpath');
const blogPosts = require('./controllers/posts');
const blogComments = require('./controllers/comments');

const app = express();
const PORT = 8080;

app.use(stormpath.init(app, {
  	expand: {
    	customData: true,
  	},
  	web: {
		produces: ['application/json']
	}
}));
app.use(morgan('combined'));
app.use(bodyParser());

app.post('/posts/', stormpath.apiAuthenticationRequired, blogPosts.createBlogPost);

app.get('/posts/:id', blogPosts.retrieveBlogPosts);

app.put('/posts/:id', stormpath.apiAuthenticationRequired, blogPosts.modifyBlogPost);

app.delete('/posts/:id', stormpath.apiAuthenticationRequired, blogPosts.deleteBlogPost);

app.post('/posts/:id/comments', stormpath.apiAuthenticationRequired, blogComments.createComment);

app.put('/posts/:id/comments/:commentid', stormpath.apiAuthenticationRequired, blogComments.modifyComment);

app.delete('/posts/:id/comments/:commentid', stormpath.apiAuthenticationRequired, blogComments.deleteComment);

app.listen(PORT, () => {
	console.log(`Listening on port:${PORT}`);
});

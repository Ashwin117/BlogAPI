# BlogAPI

This is a pure back-end only API that allows an authenticated user to post blog posts and comments to posts.

###Getting Started###

Here are the two commands to start this game after cloning this repo. I recommend using node 4 as the repo is littered with ES6.

```
	> npm install
	> npm start
```

You can run `> npm run cover` or `> npm test`as this repo has tested for 100% code coverage for the models folder.

[Postman API collections](https://www.getpostman.com/collections/b27e6a7918b4a566cc0e)
This link contains the collection of various requests that this API can handle.

[Authentication collections](https://www.getpostman.com/collections/f58402c8e20346821094) This link contains the collection of various requests that allows you to register a user and obtain an access token before making requests. Remember, only the author can delete and modify his posts and comments!

###Cool features of this game###
1. Uses `stormpath` for authentication.
1. Uses ES6 for writing code as smoothly as possible.
1. Uses Promises everywhere!
1. Uses `sinon`, `rewire`, and `mocha` for unit testing along with `istanbul` for looking at code coverage.
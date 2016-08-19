# BlogAPI

This is a pure back-end only API that allows an authenticated user to post blog posts and comments to posts.

###Getting Started###

Here are the commands to start this app after cloning this repo. Please use node 4 as the repo is littered with ES6.

First, run a local instance of MongoDB in another terminal

```
	> mongod
```

In the project terminal, set the environment variables:

```
	> export STORMPATH_CLIENT_APIKEY_ID=7HP4A2HP3Y25ADYKNNGTUXK5O
	> export STORMPATH_CLIENT_APIKEY_SECRET=Ag+HexjCzJQSp7qNz3yMVdEVCahpypHEtiKVwC6XInI
	> export STORMPATH_APPLICATION_HREF=https://api.stormpath.com/v1/applications/5mzuITapiJHfjvla4fCoFN
```
Then run the following:

```
	> npm install
	> npm start
```

You can run `> npm run coverage` or `> npm test`as this repo has tested for 100% code coverage for the models folder.

[Postman API collections](https://www.getpostman.com/collections/b27e6a7918b4a566cc0e)
This link contains the collection of various requests that this API can handle.

[Authentication collections](https://www.getpostman.com/collections/f58402c8e20346821094) This link contains the collection of various requests that allows you to register a user and obtain an access token before making requests. Remember, only the author can delete and modify his posts and comments!

###Cool features of this app###
1. Uses `stormpath` for authentication.
1. Uses `mongodb` as the database for storage and `mongojs` to communicate with it.
1. Uses ES6 for writing code as smoothly as possible.
1. Uses Promises everywhere!
1. Uses `sinon`, `rewire`, and `mocha` for unit testing along with `istanbul` for looking at code coverage.
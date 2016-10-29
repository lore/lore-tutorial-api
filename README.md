# Lore Tutorial API Server

This is the API server for the Lore tutorial. It is a [Sails](http://sailsjs.org) application.

## Installation

First clone this repository:

```
git clone git@github.com:lore/lore-tutorial-api.git
```

Then navigate into the repository:

```
cd lore-tutorial-api
```

Next install the dependencies:

```
npm install
```

Then start the API server:

```
npm start
```

To confirm the API server is installed and running, navigate to `http://localhost:1337` and you should see a list of the endpoints for this API:

```js
{
  tweets: "http://localhost:1337/tweets",
  users: "http://localhost:1337/users",
  user: "http://localhost:1337/user"
}
```

## Endpoints
Documentation for each endpoint.

### /tweets
This endpoint returns a list of tweets. Anyone can GET the list of tweets, but creating, updating or deleting tweets requires authentication. Example tweet:

```
{
  id: 1,
  user: 4,
  text: "Yummy frog! For Ayla eat?",
  createdAt: "2016-10-17T22:35:40.035Z",
  updatedAt: "2016-10-29T22:35:40.064Z"
}
```

### /users
This endpoint returns a list of users. Example user:

```
{
  id: 4,
  nickname: "ayla",
  avatar: "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png",
  createdAt: "2016-10-29T22:35:40.024Z",
  updatedAt: "2016-10-29T22:35:40.024Z"
}
```

### /user
This endpoint returns the current user (assuming you've passed along an `Authorization` header with a valid token.

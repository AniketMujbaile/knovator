# knovator
> Created APIs for login and registration using passport JWT token and Created the CRUD of Post for the only authenticated user.

### 🔗 Hosted link

Testing documentation with postman: [Testing documentation](https://documenter.getpostman.com/view/24632237/2s9YyvC1Zq)

## Features

- User Routes
  -  POST /register - Create a new User
  -  POST /login - login User

- Post Routes
  -  POST /posts - Create a new Post
  -  GET /posts/:id - Get the posts by ID
  -  PUT /posts/:id - Update Posts by ID
  -  DELETE /posts/:id - Delete post by ID
  -  GET  /posts/location/:latitude/:longitude - Retrieve posts using latitude and longitude.

## Requirement

- NodeJS
- Express.js 
- MongoDB

## Configuration File

 .env then modify to your environment variables PORT, mongodb uri.

```ENV

PORT=3001

MONGO_URI=YOUR_URL

JWT_SECRET=YOUR_KEY
 
```
## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AniketMujbaile/knovator.git
   cd knovator
   
## Installation

2. Install all npm dependecies:

```console
npm install
```

## Start web server

3. Start server:

```console
npm start
```

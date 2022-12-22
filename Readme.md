# Twitter Clone

A full-stack Twitter clone app built using Node.js, Express.js, React.js, and MongoDB.



https://user-images.githubusercontent.com/41536903/209054139-d854b723-bc0f-46a3-bba8-e7bd7be49f68.mp4



## Features Implemented

1. Authentication using jwt token, i.e user login and registration.
2. Create, Delete, Like, Dislike, Comment Tweet.
3. Create and Edit a User.
4. Follow and Unfollow User.
5. Update Profile picture including uploading images using [multer](https://www.npmjs.com/package/multer).


## Tech Stack Used

### For Backend
- Nodejs (bakend language)
- Expressjs (framework to create REST APIs)
- Mongoose (connect mongoDb to express.js)
- jsonwebtoken (jwt auth)
- bcryptjs (to encrypt password)
- multer (uploading images)

### For Frontend 
- Reactjs
- Bootstrap (UI library)
- react router dom (routing in UI)
- react-toastify (for notifications)
- axios (call APIs)

## How to run the app

### Installing

Install server dependencies

```bash
$ cd server
$ npm install
```

Install client dependencies

```bash
$ cd client
$ npm install
```

### Start the server in development mode

```bash
$ cd server
$ npm run start
```

If everything was successful, you should see the messages being displayed in the terminal, telling that the server has successfully connected to a MongoDB and runs on a given port.

### Start the client

```bash
$ cd client
$ npm start
```

Now, the app should be running on `http://localhost:3000`.

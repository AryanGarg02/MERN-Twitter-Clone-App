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

## Screenshots

### Login Page
<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057941-3f5c7b2e-99bd-4b16-9a9f-80df95d4ae19.png">

### Register Page
<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057961-8fcb0f80-95f1-45c8-b0e6-0d003e751949.png">


### Home Page
<img width="1558" alt="image" src="https://user-images.githubusercontent.com/41536903/209056721-27469499-720b-4a18-a0b5-886fb244eaaf.png">


### Post Tweet 
<div style="display: flex;">
<img width="1728" alt="Screenshot 2022-12-22 at 10 01 22 AM" src="https://user-images.githubusercontent.com/41536903/209056323-7ab58085-a0d4-4d24-970b-4ea1457f6dd8.png">
<img width="1592" alt="image" src="https://user-images.githubusercontent.com/41536903/209056184-dc94aecd-1b85-40eb-8b88-fb654e6f0d00.png">
</div>

### Delete Tweet

<img width="1728" alt="Screenshot 2022-12-22 at 10 04 16 AM" src="https://user-images.githubusercontent.com/41536903/209056912-142f9f0b-19f2-4a8e-aa82-8cb0c8bfe9a5.png">

### Comment on tweet

<img width="1728" alt="Screenshot 2022-12-22 at 10 04 39 AM" src="https://user-images.githubusercontent.com/41536903/209056956-5e7412ae-52aa-4f43-b707-f71e0627ed42.png">

<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057038-b1ac4474-28de-4c36-8b13-fd344c204b86.png">

<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057082-3379154e-3903-4fa6-8537-71a8b2ea2ed0.png">

### Profile Page

<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057135-d8133d5b-6eed-47eb-a8f0-d8b6d00a4648.png">

### Edit Profile

<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057234-932fb287-7dae-4168-a398-cc7a98b64d62.png">

<img width="563" alt="image" src="https://user-images.githubusercontent.com/41536903/209057265-5e6c77a5-7df3-4faa-a3d1-05c67bfccc1d.png">

### Upload Profile Pic
<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057350-56cd35c8-0a4d-485b-bf66-0811b8624845.png">

<img width="551" alt="image" src="https://user-images.githubusercontent.com/41536903/209057360-ede893b4-d6d4-4a16-86ef-c84d95bf193c.png">

<img width="532" alt="image" src="https://user-images.githubusercontent.com/41536903/209057380-1c8456e9-9ebd-431c-bd9d-6586ef14312b.png">

### Tweet Details Page
<img width="1728" alt="image" src="https://user-images.githubusercontent.com/41536903/209057565-15b2b6b8-2e04-4304-8d21-81d88ca3ab81.png">




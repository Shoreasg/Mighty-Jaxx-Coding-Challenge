# MightyJaxx Admin Dashboard

## Demo Links
[Frontend](https://mighty-jaxx-coding-challenge.vercel.app/)

[Backend](https://mighty-jaxx-be.herokuapp.com/)


## Repositories
[Frontend Repo](https://github.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/tree/main/frontend)

[Backend Repo](https://github.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/tree/main/backend)


# Introduction

This was an assignment by Mighty Jaxx. Task was to create an admin dashboard with login function and CRUD.
Details can be found [here](https://github.com/Mighty-Jaxx-International-Pte-Ltd/Coding-Challenge-for-Full-Stack-Engineers) 



# Features:

- User is able to login using the following credentials (Email: MightyJaxx@test.com, Password: MightyJaxx@123)
- User is able to add new products into the dashboard
- User is able to edit existing items in dashboard
- User is able to delete items on dashboard



# Screenshots:

## Mockup
![Mockup](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/Dashboard.jpeg)
![Mockup2](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/Login.jpeg)
## Login Page

![Login Page](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/LoginDashboard.JPG)

## Dashboard Page

![Dashboard Page](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/dashboard.JPG)

## Add Product Page

![Add Product Page](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/AddProduct.JPG)

## Edit Product Page


![Edit Product Page](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/EditProduct.JPG)

## Delete Product Page


![Delete Product Page](https://raw.githubusercontent.com/Shoreasg/Mighty-Jaxx-Coding-Challenge/main/screenshots/DeleteProduct.JPG)


# Technologies used


## FrontEnd
- [NextJs](https://nextjs.org/)
- [Redux ToolKit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [react-hook-form](https://react-hook-form.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [sweetalert2](https://sweetalert2.github.io/)



## BackEnd
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [cors](https://github.com/expressjs/cors)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [nodemon](https://nodemon.io/)
- [zod](https://zod.dev/)



# Reflection

This is my second time working on a project using typescript. Tried new tools such as zod, redux tool kit and jsonwebtoken. Overall, enjoyed this take home assignment as i get to try and learn new tools.

# Assumptions

1: I assumed that no register form is needed as this is an admin page, hence registration should be done in private

2: I assumed that uploading of image requires the user to enter the image url. This means that the user have already uploaded the image to a image hosting site and just need to enter the URL.


# Setup

To run this project, install it locally using npm:

# Frontend

```
$ git clone
$ npm i
Add NEXT_PUBLIC_BACKEND_URL= to .env
$ npm run dev

```

# Backend

```
$ git clone
$ npm i
Add
PORT=
DATABASE=
MONGO_USER=
MONGO_PASSWORD=
MONGO_BASE_URL=
SECRET=
JWTSECRET=
FRONTEND_URL=
to .env
$ tsc
$ npm start

```


## Contributors



[Shoreasg](https://github.com/Shoreasg) 


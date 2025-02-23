# Devtinder Api

## authRouter
- POST / signup
- POST / login
- POST / logout

## profileRouter
- GET /profile/view
- PATCH/profile/edit
- PATCH/profile/password #TODO: Create a Forgot Password API doneby Yourself

## connetionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connection 
- GET /user/requests/received
- GET /feed - Gets you the profiles of other users on platforms

Status: ignore, intrested , accepted , rejected

# DevTinder Web

- Create  a Vite + React application
- Remove unecessary code and create a hello world app
- Install Tailwind 3.4 version 
- Install Daisy UI
- Add Navbar Component IN it
- Create a BrowserRouter and > Routes > Route=/ Body > RouteChildren
- Create the Outlet in Body Component and Footer 
- Create a Login Page
- Install Axios 
- CORS - install cors in backend => add middleware to with configuration: with origin and credentials
- Whenever you are making api calls so pass axios => {withCredentials:true }
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducers to Store 
- Logout Feature 
- Get the feed and add feed in the store
- Build the user Card on feed
- See All the connections Page
- See All My connections Requests Page 
- Feature - Accept/Reject Connection Requests

Body: 
    NavBar
    Route= / => Feed
    Route= /login => Login
    Route= /connections => Connections
    Route= /profile => Profile 
# Devtinder Api

## authRouter
- POST / signup
- POST / login
- POST / logout

## profileRouter
- GET /profile/view
- PATCH/profile/edit
- PATCH/profile/password

## connetionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connection 
- GET /user/requests/received
- GET /feed - Gets you the profiles of other users on platforms

Status: ignore, intrested , accepted , rejected
DevTinder Project

- Order of sequence in routes matter a lot. 
- GET /Users => Middleware Chain => Request Handler (which actually send the data)
- Middleware is just a function in route handlers.

- Read more About Middleware
- Read about app.use and app.all routes
- Route has paramaters like (err, req , res , next) but we can use like (req , res , next) but 
 always write a trycatch function
 - Use Validator Library for validating email , password and url 
 - We have store the password in hash form using bcrypt library 

- Note: use the cookieparser middleware for getting for the cookie from the browser which parse the cookie 

- Unique: True in schema automatically add a unique index in mongodb or you can add intex equal to true manually add in Schema 
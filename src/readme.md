1. The instance of express() object is the entry point of our program.
2. JSON Web Token (JWT)
3. Generate JWT secret from terminal using below command
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
4. Dependencies are the crucial packages required for your application to function in a production environment. At the same time, devDependencies are tools and utilities that aid in the development process but are not needed in production.
5. .prettierignore and .prettierrc are used for the code consistency so that when the other developers work and opt for different code style eg:- double commas and a single comma conflict
6. JavaScript IIFE (Immediately Invoked Function Expression) function. Most of the developers start IIFE function with semicolon(;).
7. Followed the following blog for this particular project https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
8. Node js project runs on a particular process inside the system hence we can use process instance throughout the project.
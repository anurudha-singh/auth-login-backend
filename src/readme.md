1. The instance of express() object is the entry point of our program.
2. JSON Web Token (JWT)
3. Generate JWT secret from terminal using below command
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
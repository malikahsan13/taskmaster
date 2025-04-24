mkdir client

mkdir server && cd server
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken
tsc --init
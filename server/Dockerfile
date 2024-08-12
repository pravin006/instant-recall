FROM node:20.10.0-slim

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

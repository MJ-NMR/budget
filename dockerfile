FROM node:latest

WORKDIR /app


#RUN apt-get update -y && apt-get install sqlite3 -y

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

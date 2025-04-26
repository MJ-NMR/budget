FROM node:16

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install sqlite3

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
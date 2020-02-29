FROM node:10

WORKDIR /home/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
COPY . .

EXPOSE 8080

COPY init.sql /docker-entrypoint-initdb.d/10-init.sql

CMD npm start
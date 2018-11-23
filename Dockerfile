FROM node:11

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install --production

COPY /migrations /app/migrations
COPY /lib /app/lib

CMD NODE_ENV=production npm start

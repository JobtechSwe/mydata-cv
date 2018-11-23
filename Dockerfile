FROM node:alpine

# Create app dir
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm ci

# Bundle app source
COPY . /app

RUN npm run build

CMD [ "npm", "start" ]

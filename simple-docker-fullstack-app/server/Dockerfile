FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY server/ ./server/
WORKDIR /usr/src/app/server
EXPOSE 8000
CMD [ "node", "index.js" ]
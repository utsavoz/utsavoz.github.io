FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm update
RUN npm install package.json
COPY server.js ./

COPY public/ public/
EXPOSE 80

CMD [ "node", "server.js" ]

FROM node:12

WORKDIR /usr/src/app
COPY server/package*.json ./
COPY server/tsconfig.json ./

RUN npm install
COPY server/ .

EXPOSE 8080
CMD ["npm", "start"]

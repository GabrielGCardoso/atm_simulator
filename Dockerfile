FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ./initdb.sh

EXPOSE 3000

# CMD ["npm", "run", "docker"]
CMD ["node", "src/index.js"]

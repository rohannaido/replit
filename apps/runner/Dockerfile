FROM node:20

WORKDIR /code

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
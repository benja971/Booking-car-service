FROM node:18.8.0

WORKDIR /code

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "nodemon"]

FROM node:18.11.0

WORKDIR /code

COPY package.json ./

# update packages and install dependencies
RUN apt-get update 
# install git
RUN apt-get install -y git 
# install pnpm
RUN npm install -g pnpm

# install node modules
RUN pnpm install

COPY . .

CMD ["pnpm", "run", "start"]
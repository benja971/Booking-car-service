FROM node
WORKDIR /app
COPY ./package*.json .
RUN npm install
# RUN npm ci --only=production
COPY . .
ENTRYPOINT [ "npm", "run", "dev" ]
# ENTRYPOINT [ "npm", "start" ]

FROM node:12-alpine

WORKDIR /app

COPY package* ./
COPY .sequelizerc ./

RUN npm install
RUN npm install -g sequelize-cli

EXPOSE 3232

CMD npm run dev
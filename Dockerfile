FROM node:23.5.0

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run" , "start" ]

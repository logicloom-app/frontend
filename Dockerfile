FROM node:20.13.1

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run" , "start" ]

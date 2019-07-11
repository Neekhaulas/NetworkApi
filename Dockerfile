FROM node:10

ENV PRISMA_ENDPOINT http://localhost:4466

WORKDIR /networkapi

RUN apt-get update

RUN apt-get install libav-tools -y

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate

CMD ["npm", "start"]
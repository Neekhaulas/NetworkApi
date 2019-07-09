FROM node:10

ENV PRISMA_ENDPOINT http://localhost:4466

WORKDIR /networkapi

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "generate"]
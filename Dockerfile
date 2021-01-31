FROM node:latest

COPY package.json .
COPY yarn.lock .
COPY ormconfig.docker.json ./ormconfig.json
COPY dist ./dist
COPY .env .

RUN npm install

CMD node dist/index.jsE
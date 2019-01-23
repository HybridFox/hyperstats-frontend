FROM node:dubnium

RUN mkdir -p /app

ARG NODE_ENV=local
ENV NODE_ENV $NODE_ENV

RUN npm i npm@latest -g

WORKDIR /
COPY package.json package-lock.json* .npmrc ./
RUN MONGOMS_VERSION=4.0.0 npm install --silent
ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

EXPOSE 4351

CMD [ "node", "index.js" ]

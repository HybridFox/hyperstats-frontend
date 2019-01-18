FROM node:dubnium-alpine

RUN mkdir -p /app

RUN npm i npm@latest -g

WORKDIR /
COPY package.json package-lock.json* .npmrc ./
RUN npm ci
ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . /app

EXPOSE 4350

CMD [ "npm", "start" ]

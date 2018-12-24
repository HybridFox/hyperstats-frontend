FROM node:dubnium

RUN mkdir -p /app

WORKDIR /
COPY package.json package-lock.json* /
RUN npm install

ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . /app

CMD [ "node", "index.js" ]

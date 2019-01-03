FROM node:carbon

RUN mkdir -p /app
WORKDIR /app

RUN npm i npm@latest -g

COPY package.json package-lock.json* .npmrc ./
RUN npm install
ENV PATH /node_modules/.bin:$PATH

COPY . /app

EXPOSE 4350

CMD [ "npm", "start" ]

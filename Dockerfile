FROM node:lts

WORKDIR /usr/web_voyager

COPY . .

RUN npm install pnpm -g && pnpm install && pnpm run build

EXPOSE 3000

ENTRYPOINT node ./build/index.js

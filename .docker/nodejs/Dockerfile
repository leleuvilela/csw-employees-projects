FROM node:20-alpine AS base

WORKDIR /usr/src/app/angular

EXPOSE 4200

FROM base AS install

CMD [ "npm", "install" ]

FROM base AS develop

CMD [ "npm", "run", "start" ]

FROM base AS remote

COPY source/client /usr/src/app/angular
RUN npm ci

FROM node:18-alpine AS builder

USER node
WORKDIR '/home/node'

ENV NODE_ENV build

COPY package*.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
RUN yarn build \
    && yarn install --production --ignore-scripts --prefer-offline

FROM node:18-alpine

ENV NODE_ENV production

USER node
WORKDIR '/home/node'

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 19998

CMD ["yarn", "start:prod"]
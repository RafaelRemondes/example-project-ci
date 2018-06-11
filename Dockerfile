FROM node:9.11.1-alpine

WORKDIR /home/node

RUN set -x \
  && apk --no-cache --virtual .build-dependencies add g++ gcc git make openssh postgresql-dev python \
  && apk --no-cache add bash postgresql-libs

COPY package.json yarn.lock ./

RUN set -x \
  && yarn \
  && yarn cache clean \
  && chmod -R go+r . \
  && rm -rf ~/.ssh \
  && apk del .build-dependencies

COPY . ./

USER node

ENTRYPOINT ["node"]

FROM node:12

ENV NODE_ROOT /usr/src/app
RUN mkdir -p $NODE_ROOT
WORKDIR $NODE_ROOT

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]

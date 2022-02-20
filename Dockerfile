#
# Builder
#
FROM stefanscherer/node-windows:12.18.3 AS builder

RUN ["cmd", "mkdir", "c:\\azurite"]
WORKDIR c:/azurite

# Install dependencies first
COPY *.json LICENSE NOTICE.txt ./

# Copy the source code and build the app
COPY src ./src
COPY tests ./tests
RUN npm config set unsafe-perm=true && \
  npm ci
RUN npm run build && \
  npm install -g --loglevel info


#
# Production image
#
FROM node:lts-alpine3.10

ENV NODE_ENV=production

RUN ["cmd", "mkdir", "c:\\azurite"]
WORKDIR c:/azurite

# Default Workspace Volume
VOLUME [ "/data" ]

COPY package*.json LICENSE NOTICE.txt ./

COPY --from=builder c:/azurite/dist/ dist/

RUN npm config set unsafe-perm=true && \
  npm install -g --loglevel info

# Blob Storage Port
EXPOSE 10000
# Queue Storage Port
EXPOSE 10001
# Table Storage Port
EXPOSE 10002

CMD ["azurite", "-l", "/data", "--blobHost", "0.0.0.0","--queueHost", "0.0.0.0", "--tableHost", "0.0.0.0"]

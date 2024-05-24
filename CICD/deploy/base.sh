#!/usr/bin/env sh

projectId=chillvgamaky

IMAGE_NAME=${SERVICE_NAME}.tar.gz
SSH_HOST=root@165.22.85.102
DOCKER_COMPOSE_FOLDER=/opt/app/git/monorepo/CICD/docker-compose

# cleanup local docker builds
docker stop ${SERVICE_NAME} || true
docker rm ${SERVICE_NAME} || true
docker rmi ${projectId}/${SERVICE_NAME} || true

# build an image and save it into local docker hub
docker build --memory="4g" --compress -t ${projectId}/${SERVICE_NAME}:latest ${SERVICE_PATH} || exit 1

# save an image as a file to upload it on the server
docker save ${projectId}/${SERVICE_NAME}:latest | gzip > ${IMAGE_NAME} || exit 1

# upload the image on the server
rsync -r -v --progress -e ssh ${IMAGE_NAME} ${SSH_HOST}:${DOCKER_COMPOSE_FOLDER} || exit 1

rm ${IMAGE_NAME}

docker rmi ${projectId}/${SERVICE_NAME}

ssh -t ${SSH_HOST} "cd ${DOCKER_COMPOSE_FOLDER} \
&& docker-compose stop \
&& docker rm ${SERVICE_NAME} || true \
&& docker rmi ${projectId}/${SERVICE_NAME} || true \
&& docker load --input ${IMAGE_NAME} \
&& rm ${IMAGE_NAME} \
&& docker-compose up -d --remove-orphans"

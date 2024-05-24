#!/bin/bash

# shellcheck disable=SC2034
SERVICE_NAME=nginx
SERVICE_PATH=../../backend/nginx

source base.sh

# docker exec -it nginx certbot --nginx -d chillvgamaky.if.ua -d www.chillvgamaky.if.ua --agree-tos -m roman.malko@gmail.com

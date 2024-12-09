#!/bin/bash

echo "执行打包"
docker_version=$1
echo "执行docker构建，版本：${docker_version:=0.0.1}"
docker build -t  registry-docker.rightknights.com/gpts/front-recentlyfolowed:${docker_version}  . --platform=linux/amd64
echo "执行推送"
docker push registry-docker.rightknights.com/gpts/front-recentlyfolowed:${docker_version}

echo "完成部署"

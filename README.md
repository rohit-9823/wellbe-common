# IBD Front

# Overview

For information, see the [IBD Front Backlog page](https://welbyinc.backlog.jp/test).

## System environment

| Node        |
|-------------|
| v16.16.0    |

## Getting Started

## System Requirement version

1. docker 20+
2. docker-compose 1.29+

### Config file

```shell
$ cd app
$ cp nuxt.example.config.js nuxt.config.js
```

### Build

List the shells from makefile

```shell
$ make help
```

Create a Docker image and start the container.

```shell
# this starts the nuxt server 
$ make start

# this starts the nuxt story book server
$ make story
```

Delete the Docker image / container.

```shell
$ make clean
```

### Linting and Formatting

```shell
$ make lint
$ make lintfix
```

## At this point you should actually be able to curl the API

url : http://localhost:3001

## ECSデプロイ
### ECRにpush(web)
```shell
$ aws ecr get-login-password --region ap-northeast-1 --profile welby | docker login --username AWS --password-stdin 649310177053.dkr.ecr.ap-northeast-1.amazonaws.com
$ docker build -t welby-common-v2-web-stg -f ./_deploy/node/Dockerfile_stage ./
$ docker tag welby-common-v2-web-stg:latest 649310177053.dkr.ecr.ap-northeast-1.amazonaws.com/welby-common-v2-web-stg:latest
$ docker push 649310177053.dkr.ecr.ap-northeast-1.amazonaws.com/welby-common-v2-web-stg:latest
```
## base image
FROM python:3.6-slim-buster AS build-requirements

## install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc curl

## Install node
RUN  curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt install -y nodejs

## virtualenv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


## add and install python requirements
RUN pip install --upgrade pip && pip install pip-tools pipenv-to-requirements pipenv
ADD Pipfile .
RUN pipenv run pipenv_to_requirements -o requirements-custom.in
RUN pip-compile requirements-custom.in -o requirements.txt && pip-sync
RUN pip install -r requirements.txt && rm requirements-custom.in requirements.txt

## add and install node requirements
RUN mkdir /root/node_dependencies
ADD package.json /root/node_dependencies
WORKDIR /root/node_dependencies

RUN npm install

## build-image
FROM python:3.6-slim-buster

MAINTAINER Odur Joseph <odurjoseph8@gmail.com>

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH="/opt/venv/bin:$PATH"

## copy Python and node dependencies from build image
COPY --from=build-requirements /opt/venv /opt/venv
COPY --from=build-requirements /root/node_dependencies/node_modules /app/node_modules

## install nodejs
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y nodejs && \
    apt-get clean

WORKDIR /app
ADD . /app/

ENV DJANGO_SETTINGS_MODULE backend.settings

RUN /bin/bash -c "source ./bin/functions/set_node_path.sh && setNodePath"

EXPOSE 3000 8000

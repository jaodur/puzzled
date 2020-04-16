FROM python:3.6.5

MAINTAINER Odur Joseph <odurjoseph8@gmail.com>

ENV PYTHONUNBUFFERED 1

ENV PIPENV_IGNORE_VIRTUALENVS 0

ENV PIPENV_SKIP_LOCK 1

RUN  curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt install nodejs

RUN mkdir /app

ADD Pipfile /app/

WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system

ADD package.json /app/

RUN npm install

RUN npm rebuild node-sass

ADD . /app/

ENV DJANGO_SETTINGS_MODULE backend.settings

RUN /bin/bash -c "source ./bin/functions/set_node_path.sh && setNodePath"

EXPOSE 3000 8000

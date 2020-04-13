FROM python:3.6.5

ENV PYTHONUNBUFFERED 1

ENV PIPENV_IGNORE_VIRTUALENVS 0

ENV PIPENV_SKIP_LOCK 1

RUN mkdir /app

ADD Pipfile /app/

WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system

ADD . /app/

ENV DJANGO_SETTINGS_MODULE backend.settings

EXPOSE 8000

ENTRYPOINT ["python", "manage.py"]

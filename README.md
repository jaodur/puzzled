[![Build Status](https://travis-ci.org/ja-odur/puzzled.svg?branch=develop)](https://travis-ci.org/ja-odur/puzzled)
[![Coverage Status](https://coveralls.io/repos/github/ja-odur/puzzled/badge.svg?branch=develop)](https://coveralls.io/github/ja-odur/puzzled?branch=develop&service=github)
## __Puzzled__ 
Is a web based gaming app. The app currently can crack any 2x2 or 3x3 Sudoku puzzles. 

coming soon - poker

The app is built with __Python/Django/Graphene__ for its backend, __Node/Typescript/React/Apollo__ for its frontend

## ___Prerequisites___

* `Git` [Guide to Git](https://git-scm.com/doc) [Installing Git](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
* `Python 3.5 or higher` [Python Software Foundation](https://www.python.org/)
* `Pip` [Guide to installing pip](https://github.com/BurntSushi/nfldb/wiki/Python-&-pip-Windows-installation)
* `Pipenv` [Pipenv documentation](https://docs.pipenv.org/en/latest/)
* `NodeJs` [Download nodejs](https://nodejs.org/en/download/)
* `Npm` [NpmJs](https://www.npmjs.com/get-npm)
* `Redis` [Redis QuickStart](https://redis.io/topics/quickstart)
* optional `Docker` [Docker QuickStart](https://docs.docker.com/)


## __Cloning__
* After installing the **`prerequisites`** above, clone the repository Develop branch
using this command `git clone -b develop https://github.com/ja-odur/puzzled.git`
* Change into the newly cloned repo through `cd puzzled`

# __Docker Installation__
## __Key docker environment variables__
After the setting up the `.env` file following the `.env_sample`. ensure to have the following keys with 
the following docker image values;

__DATABASE_URI__
* $**`postgresql://docker:docker@db:5432/puzzled`**

__REDIS_URL__
* $**`redis://redis:6379/0`**

## __Starting the development application__
Build the docker images using
* $ **`docker-compose build`**

Starting the development application
* $ **`docker-compose up`**

# __Manual Installation__
## __Installing virtual environment and installing dependencies__
Using pipenv, start the environment and install requirements
* $ **`pipenv shell`**

Install the `invoke` library
* $ **`pip install invoke`**

Using invoke, install both Python and Node dependencies using
* $ **`inv install-requirements`**

Set-up Node path
* $ **`source ./bin/functions/set_node_path.sh && setNodePath`**

## __Setting up environment variables__
* create a `.env` file in the root directory and add the environment variables key defined in the
`.env_sample` file with their corresponding values.


## __Starting the application__
Run webpack build
* $ **`inv build-local`**

Start the Django server
* $ **`inv run-server`** in [terminal](https://www.taniarascia.com/how-to-use-the-command-line-for-apple-macos-and-linux/)

## __Local development__
Enabling hot-reloading using `webpack-dev-server`, run the following command in a separate terminal
* $ **`inv webpack-server`**

Checking for JS and Python Linting respectively
* $ **`inv lint-js`**
* $ **`inv lint-py`**

Auto-fixing JS and Python linting respectively
* $ **`inv prettier-js`**
* $ **`inv prettier-py`**

Running Python tests
* $ **`inv test-py`**

### __Starting redis and django-q servers__

Run the following commands in separate terminals

Starting redis
* $ **`redis-server`**

Starting django-q cluster
* $ **`python manage.py qcluster`**

## __Author__

Odur Joseph

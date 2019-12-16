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
* `Npm` [npmjs](https://www.npmjs.com/get-npm)


## __Cloning__
* After installing the **`prerequisites`** above, clone the repository Develop branch
using this command `git clone -b develop https://github.com/ja-odur/puzzled.git`
* Change into the newly cloned repo through `cd puzzled`

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

## __Author__

Odur Joseph

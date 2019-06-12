## __Puzzled__ 
Is a web based gaming app. The app cuurent can crack any 2x2 or 3x3 Sudoku puzzles. 
comming soon poker

The app is built with ___Python/Django___ and __graphene__ for its backend.

## __How to setup the api backend__

## ___Prerequisites___

* `Git` [Guide to Git](https://git-scm.com/doc) [Installing Git](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
* `Python 3.5 or higher`
* `Pip` [Guide to installing pip](https://github.com/BurntSushi/nfldb/wiki/Python-&-pip-Windows-installation)
* `Pipenv` [Pipenv documentation](https://docs.pipenv.org/en/latest/)


## __Cloning and installing dependencies__
* After installing the **`prerequisites`** above, clone the repository Develop branch
using this command `git clone -b develop https://github.com/ja-odur/puzzled.git`
* Change into the newly cloned repo through `cd puzzled`
* Install the required dependencies through command `pip3 install -r requirements.txt`
 **`Note`** These dependencies can be installed in virtual environment, by running the same
command above after installing and activating a `Python` virtual environment.

### __Installing virtual environment__
Using pipenv, start the environment through command `pipenv shell`
* Install the required dependencies through command `pipenv install`
* Install the required dependencies through command `pipenv shell install -r requirements.txt`
* $**`[sudo] pip install virtualenv`**

Create a new virtual environment using the command shown below where`ENV` is a directory to place the new virtual 
environment.
* $ **`virtualenv ENV`**

In a newly created virtualenv folder `ENV`, there will also be a activate shell script used to
activate the environment.
* $ **`source bin/activate`**

After activating the virtual environment, the dependencies can be installed as illustrated
above.

Removing a virtual environment is simply done by deactivating it and deleting the environment folder 
with all its contents:
* **`(ENV)$ deactivate`** -Deactivating the environment
* **`$ rm -r /path/to/ENV`** -Deleting the environment

For more information on installing and using python virtual environments, check the link below.
[Guide to installing virtual environment](https://virtualenv.pypa.io/en/stable/installation/)


## __Starting the application__
After cloning and installing the required dependencies, start the app using the command
below
**`python run.py`** in [terminal](https://www.taniarascia.com/how-to-use-the-command-line-for-apple-macos-and-linux/)



##  __How to use the api__
This `api` was documented flasgger swagger.
After starting the application, the documention, if the you are working on the same machine on which
the application is running `(localhost)`. Then the api documentation can be acccessed
through the link that looks like **`http://localhost:5000/apidocs/`**. Where the 5000 is the port on
which the application is running. click the like for a demo if the applicatioon is 
running on port 5000.

Documentation  |
---       | 
[LINK-local](http://localhost:5000/apidocs/) |
[LINK-Online demo](https://book-a-meal-odur.herokuapp.com/apidocs/) |



## __Author__

Odur Joseph

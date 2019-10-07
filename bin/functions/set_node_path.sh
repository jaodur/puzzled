#!/bin/bash

# Import the functions we need
source "bin/functions/general.sh"

nodePath="/node_modules/.bin"

if [[ $PATH == *"${nodePath}"* ]];
then

    handle_exit 0 "Node path already set"
fi

PATH=$PATH:$(pwd)/node_modules/.bin
log  "Node path set: ${PATH}"

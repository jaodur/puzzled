#!/bin/sh
set -e

files="$@"
if [ -z "$files" ]; then
    files='frontend/**/*.{js,jsx,css,less,ts,tsx}'
    tslint --fix "frontend/**/*.{,ts,tsx}"
fi


prettier --write "$files"

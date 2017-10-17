#! /bin/bash
node ./deploy.js
mkdir ./dist
rm -rf ./dist/*
cp -r  ./src/js ./dist/js
cp -r  ./src/images ./dist/images
cp -r  ./src/stylesheets ./dist/stylesheets





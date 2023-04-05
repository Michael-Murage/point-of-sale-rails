#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
rm -rf public
npm install --prefix client && npm run build --prefix client
bundle exec rake db:migrate db:seed
cp -a client/build/. public/

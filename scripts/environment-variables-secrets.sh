#!/bin/bash

cf set-env $APP_NAME EASEY_ACCOUNT_API_SECRET_TOKEN $ACCOUNT_API_SECRET_TOKEN
cf set-env $APP_NAME EASEY_ACCOUNT_API_KEY $ACCOUNT_API_KEY

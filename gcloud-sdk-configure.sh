#!/usr/bin/env bash

set -e
if [ ! -f "$HOME/google-cloud-sdk/bin/kubectl" ]; then 
    gcloud --quiet components update kubectl;
    gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}";
    gcloud config set project $PROJECT_ID;
    gcloud config set compute/zone $ZONE;
fi
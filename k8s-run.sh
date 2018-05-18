#!/usr/bin/env bash

set -e

kubectl create -f deployment.yml
kubectl create -f service.yml
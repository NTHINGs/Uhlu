#!/usr/bin/env bash

set -e

#Build image
docker build --no-cache=true -t $1 .
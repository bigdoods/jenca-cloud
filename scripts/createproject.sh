#!/usr/bin/env bash

data=$(cat src/api/test/fixtures/bimserverproject.json)
curl -XPOST --header "Content-type: application/json" -d "$data" http://127.0.0.1:80/v1/projects
#!/bin/bash -e

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

echo
echo "restart your shell session then:"
echo
echo "nvm install 5.4.0"
echo "nvm use 5.4.0"
echo
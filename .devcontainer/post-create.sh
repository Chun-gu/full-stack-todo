#!/usr/bin/env bash

echo -e "\nalias pn='pnpm' pnx='pnpm dlx'" >> ~/.bashrc

# https://github.com/devcontainers/features/blob/main/src/node/README.md#using-nvm-from-postcreatecommand-or-another-lifecycle-command
. ${NVM_DIR}/nvm.sh && nvm install --lts

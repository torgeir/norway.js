# norway.js

## install

You need a fork of terraform, to make compiling traceur work with harp

    git clone git@github.com:torgeir/terraform.git
    cd terraform
    npm link

All set; clone, link in the fork of terraform, run

    git clone git@github.com:torgeir/norway.js.git
    cd norway.js
    mkdir node_modules
    npm install harp
    rm -r node_modules/harp/node_modules/terraform
    cd node_modules/harp/node_modules
    npm link terraform
    rm -r terraform/test # yeah, I know, but it has invalid json testdata that harp reads, and fails
    cd ../../..

## run

    cd public
    ../node_modules/.bin/harp server

## compiling

    ./compile

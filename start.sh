#!/bin/bash

repo="https://github.com/IzK-ArcOS/ArcOS-Frontend"
name="v5-graph.svg"

sudo npm i -g madge
rm -rf ./temp
git clone --recurse-submodules $repo temp
npm i
node index.js
madge --image $name --warning  --include-npm --extensions ts,svelte ./temp
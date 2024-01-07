#!/bin/bash

repo="https://github.com/IzK-ArcOS/ArcOS-Frontend"
name="v5-graph.svg"

rm -rf ./temp
git clone --recurse-submodules $repo temp
node index.js
madge --image $name --warning  --include-npm --extensions ts,svelte ./temp
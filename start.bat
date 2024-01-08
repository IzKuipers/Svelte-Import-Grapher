@echo off
setlocal

set repo=https://github.com/IzK-ArcOS/ArcOS-Frontend
set name=v5-graph.svg

call npm i -g madge
rmdir /s/q .\temp
git clone --recurse-submodules %repo% temp
call npm i
call node index.js
call madge --image %name% --warning  --include-npm --extensions ts,svelte ./temp

endlocal
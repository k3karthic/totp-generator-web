#!/usr/bin/env bash

cat build/index.html | sed 's/ connect-src ws:\/\/127.0.0.1:\*//' | sed "s/ 'sha256-iN7wpJdxHlpujRppkOA8N0+Mzp0ZqZr3lCtxM00Y63c='//" > dist/index.html
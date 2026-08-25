#!/bin/bash
# Сборка статической версии сайта в ./dist
# API-роуты, админка и middleware в статику не входят — на время сборки откладываются.
set -e
cd "$(dirname "$0")"

STASH=$(mktemp -d)
restore() {
  [ -d "$STASH/api" ] && mv "$STASH/api" src/app/api
  [ -d "$STASH/admin" ] && mv "$STASH/admin" src/app/admin
  [ -f "$STASH/middleware.ts" ] && mv "$STASH/middleware.ts" src/middleware.ts
  rm -rf "$STASH"
}
trap restore EXIT

mv src/app/api "$STASH/api"
mv src/app/admin "$STASH/admin"
mv src/middleware.ts "$STASH/middleware.ts"

STATIC_EXPORT=1 npx next build

rm -rf dist
mv out dist
touch dist/.nojekyll
echo "✓ Статическая сборка готова: ./dist"

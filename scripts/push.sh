#!/usr/bin/env bash
set -e
MSG="$*"
if [ -z "$MSG" ]; then
  MSG="chore: auto push $(date +'%Y-%m-%d %H:%M:%S')"
fi
git add -A
git commit -m "$MSG" || true
git push

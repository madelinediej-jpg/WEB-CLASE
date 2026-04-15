#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-5500}"

printf 'Iniciando preview en http://localhost:%s/index.html\n' "$PORT"
python3 -m http.server "$PORT"

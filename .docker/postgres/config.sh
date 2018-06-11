#!/bin/sh
set -e

cat <<-EOF >> $PGDATA/postgresql.conf
pg_stat_statements.track = all
shared_preload_libraries = 'pg_stat_statements'
EOF

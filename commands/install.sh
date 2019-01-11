#!/bin/bash
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
. $ROOT/.env

# apt update
# apt install -y postgresql
# locale-gen en_US.UTF-8
# service postgresql start
cat <<-END | sudo -u postgres psql
CREATE DATABASE $TYPEORM_DATABASE;
CREATE USER $TYPEORM_USERNAME WITH ENCRYPTED PASSWORD '$TYPEORM_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $TYPEORM_DATABASE TO $TYPEORM_USERNAME;
END

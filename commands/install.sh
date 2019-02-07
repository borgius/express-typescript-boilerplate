#!/bin/bash
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# apt update
# apt install -y postgresql
# locale-gen en_US.UTF-8
# service postgresql start

function createDB() {
    sudo -Hiu postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '$TYPEORM_DATABASE'" | grep -q 1 || sudo -Hiu postgres psql -c "CREATE DATABASE $TYPEORM_DATABASE"
    cat <<-END | sudo -Hiu postgres psql

DROP ROLE IF EXISTS $TYPEORM_USERNAME;
CREATE USER $TYPEORM_USERNAME WITH ENCRYPTED PASSWORD '$TYPEORM_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $TYPEORM_DATABASE TO $TYPEORM_USERNAME;

END
}

#. $ROOT/.env && createDB
. $ROOT/.env.test && createDB

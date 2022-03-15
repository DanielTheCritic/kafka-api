docker compose down

docker build api -t danielthecritic/palm-tree-api

docker build kafka-api -t danielthecritic/kafka-api

docker compose up -d
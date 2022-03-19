#!/bin/bash -e

# Parse input parameters
database=books

# delete and create database to ensure it's empty
curl -X DELETE $url/$database -u $username:$password
curl -X PUT $url/$database -u $username:$password

# Upload design document
curl -X PUT "$url/$database/_design/main_design" -u $username:$password \
    -d @$current_dir/books/design.json

# Create data
curl -H "Content-Type: application/json" -d @$current_dir/books/data.json \
    -X POST $url/$database/_bulk_docs -u $username:$password

echo "Finished populating couchdb database '$database' on '$url'"

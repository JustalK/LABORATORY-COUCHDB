#!/bin/bash -e

# This script is inspired from similar scripts in the Kitura BluePic project
apt-get update && apt-get install -y \
curl

# Find our current directory
current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Parse input parameters
database=bookshelf_db

for i in "$@"
do
case $i in
    --username=*)
    username="${i#*=}"
    shift
    ;;
    --password=*)
    password="${i#*=}"
    shift
    ;;
    --url=*)
    url="${i#*=}"
    shift
    ;;
    *)
    ;;
esac
done

if [ -z $username ]; then
  echo "Usage:"
  echo "seed.sh --username= --password= [--url=]"
  echo "    default for --url is '$url'"
  exit
fi


# delete and create database to ensure it's empty
echo "URL : $url"
curl -X DELETE $url/$database -u $username:$password
curl -X PUT $url/$database -u $username:$password
echo "DB DELETED AND CREATED AGAIN"

# Upload design document
echo "$current_dir"
curl -X PUT "$url/$database/_design/main_design" -u $username:$password \
    -d @$current_dir/design.json
echo "DESIGN DOCUMENT UPLOADED"

# Create data
curl -H "Content-Type: application/json" -d @$current_dir/books.json \
    -X POST $url/$database/_bulk_docs -u $username:$password

echo
echo "Finished populating couchdb database '$database' on '$url'"

#!/bin/bash -e

# This script is inspired from similar scripts in the Kitura BluePic project
apt-get update && apt-get install -y \
curl

# Find our current directory
current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Parse input parameters
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

# Run the seeders
. /seeds/books/init.sh

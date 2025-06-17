#!/bin/bash

# this script looks for env file with the name in $ENV_FILE below
# from the root directory of repository and set variables based on it

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[0m'

# Variables
ACCESS_TOKEN=""     # GitLab user access token
BRANCH="main"

# ENV_FILE=".env.development"
# ENV_FILE=".env.staging"
ENV_FILE=".env.production"

if [ -z "$1" ]; then
  echo -ne "${CYAN}Enter GitLab project ID:${WHITE} "
  read PROJECT_ID
else
  PROJECT_ID=$1
fi

echo ""
echo "Fetching .env file from the root of the repository (ID: $PROJECT_ID)..."

FILE_CONTENT=$(curl --silent --header "PRIVATE-TOKEN: $ACCESS_TOKEN" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/repository/files/$(echo $ENV_FILE | sed 's/\//%2F/g')/raw?ref=$BRANCH")

if [[ "$FILE_CONTENT" == *"404: Project Not Found"* ]] || [[ "$FILE_CONTENT" == *"errors"* ]]; then
  echo ""
  echo -e "${RED}Failed to fetch the file. Exiting.${WHITE}"
  exit 1
else
  echo "env file found. Start setting..."
fi

echo "$FILE_CONTENT" | while IFS='=' read -r key value || [[ -n "$key" ]]; do
  # Skip empty lines and comments
  [[ -z "$key" || "$key" =~ ^# ]] && continue

  # Trim whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  echo -ne "Setting variable ${key}... "

  response=$(curl --silent --request POST --header "PRIVATE-TOKEN: $ACCESS_TOKEN" \
    --data "key=$key" \
    --data "value=$value" \
    "https://gitlab.com/api/v4/projects/$PROJECT_ID/variables")

  if echo "$response" | grep -q '"key"'; then
    echo -e "${GREEN}✔${WHITE} success"
  else
    echo -e "${RED}✘${WHITE} failed"
    echo -e "${RED}$response${WHITE}"
  fi
done

echo ""
echo -e "${GREEN}Finish setting variables.${WHITE}"

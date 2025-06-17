#!/bin/bash

# This script reads local .env or .env.example and updates GitLab variables via API
# For sensitive data, you should leave it empty as is and set it manually later

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[0m'

ACCESS_TOKEN=""     # GitLab user access token

# keep env file in the same directory as where you run the script. (NOT the directory where this file is stored)
ENV_FILE=".env"
FALLBACK_ENV_FILE=".env.example"

if [ -z "$1" ]; then
  echo -ne "${CYAN}Enter GitLab project ID:${WHITE} "
  read PROJECT_ID
else
  PROJECT_ID=$1
fi

# Check .env or .env.example file
if [ -f "$ENV_FILE" ]; then
  echo -e "${CYAN}Reading from ${ENV_FILE}...${WHITE}"
elif [ -f "$FALLBACK_ENV_FILE" ]; then
  echo -e "${CYAN}${ENV_FILE} not found, using ${FALLBACK_ENV_FILE} instead...${WHITE}"
  ENV_FILE="$FALLBACK_ENV_FILE"
else
  echo -e "${RED}env file not found. Exiting.${WHITE}"
  exit 1
fi

# Read file
while IFS='=' read -r key value || [[ -n "$key" ]]; do
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
done < "$ENV_FILE"

echo ""
echo -e "${GREEN}Finish setting variables.${WHITE}"

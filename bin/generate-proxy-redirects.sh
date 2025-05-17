#!/bin/bash

OUTPUT_FILE="/var/www/mlpcon.online/nginx/site-includes/mlpcon.online-proxy-redirects.conf";
START_YEAR=2020;
END_YEAR=$(( $(date +%Y) ));  # current year + 1

{
  echo "# Auto-generated proxy_redirect rules - do not edit manually";
  echo "# Generated on $(date)";
  for year in $(seq $START_YEAR $END_YEAR); do
    echo "proxy_redirect http://mlpcon.online/$year/ /;";
  done
} > "$OUTPUT_FILE";

#!/bin/bash

# Find .ts files and check if they contain JSX by looking for "<" and ">".
# If they do, rename them to .tsx

find . -type f -name "*.js" | while read file; do
  # Look for the JSX signature in files
  if grep -qE '<.+>' "$file"; then
    # Rename the file to .tsx
    mv "$file" "${file%.ts}.jsx"
    echo "Renamed $file to ${file%.ts}.jsx"
  fi
done

#!/bin/bash

# Exit immediately if any command fails
set -e

# Function to run commands in a specific directory
run_in_directory() {
  dir=$1
  echo "------------------------------"
  echo "Running in $dir..."
  echo "------------------------------"
  cd "$dir"

  # Install dependencies
  echo "Installing dependencies in $dir..."
  npm install

  # Conditionally run linting and formatting only if not in the "back" directory
  if [ "$dir" != "back" ]; then
    echo "Running linting..."
    npm run lint

    echo "Running formatting..."
    npm run format
  else
    echo "Skipping linting and formatting in $dir..."
  fi

  # Build the project
  echo "Building $dir..."
  npm run build

  # Start the app in the background and move on to the next task
  echo "Starting $dir..."
  npm run start &

  # Go back to the root directory
  cd -
}

# Run for back and front in parallel
run_in_directory "back"
run_in_directory "front"

# Wait for all background jobs to finish before exiting
wait

echo "------------------------------"
echo "All steps completed successfully!"
echo "------------------------------"
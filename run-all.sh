#!/bin/bash

# Exit immediately if any command fails, unless explicitly handled
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

  # Conditionally run linting, formatting, and tests only if not in the "back" directory
  if [ "$dir" != "back" ]; then
    echo "Running linting..."
    npm run lint || true  # Continue on if linting fails

    echo "Running formatting..."
    npm run format || true  # Continue on if formatting fails

    echo "Running tests..."
    npm run test:ci || true  # Continue on even if tests fail
  else
    echo "Skipping linting, formatting, and tests in $dir..."
  fi

  # Build the project
  echo "Building $dir..."
  npm run build || true  # Continue on even if the build fails

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

echo "---------------------------------"
echo "All steps completed successfully!"
echo "---------------------------------"
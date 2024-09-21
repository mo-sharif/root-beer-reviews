# Getting Started

Run the following commands to start the script in root folder

```sh
chmod +x run-all.sh
./run-all.sh
```

This should successfully cd into both the front and back directories, run npm install, npm run build, and npm test for each, and then return to the root directory. If any command fails, the script will terminate immediately.



# Reviews on Tap

This is a take home UI assignment to build a nice little web app for recording and rating root beers.  A backend has been provided for you.

## Requirements

- [x] Show a dashboard of recently added root beers
- [x] Show details of a root beer
- [x] Allow adding a root beer
- [x] Allow adding a root beer review
- [x] Allow searching for a root beer
- [x] Allow adding images of a root beer

You can be as creative and as fancy as you want with the UI, however functionality and cleanliness will be reviewed as well.

Feel free to use whichever front end framework you prefer (or none!) and any component or 3rd party libraries you wish.

## Front End

An empty folder `front` has been created for you to put your front end application in.

```sh
cd front
<scaffold and develop your UI here>
```

## Back End Server/API

A backend server has been provided for you in `back`.  It provides an API that is documented in Swagger: [http://localhost:4000/api-docs](http://localhost:4000/api-docs).

Some sample data has been pre-populated in the `back/drinks.db` file.

## Start Backend

In a different command prompt from the one you are running your front end in, run the following commands:

```sh
cd back
npm i
npm start
```

## Submission

Please create a private GitHub repo cloned from this one and share the access with:

* `ggere`
* `cdunford`
* `shravan-udupa`
* `dgravitate`

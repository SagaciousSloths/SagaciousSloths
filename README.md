Project name: FamiliHR

----- High level intro:
Fullstack JS app to help members/guests/clients of organizations remember the names of other members/guests/clients.the staff of an organization learn quickly the names of their students or guests. 
The app relies on a spaced repetition algorithm to optimize the learning.
The app was designed based on interviews with Hack Reactor staff.

Usage flow for HR:
1. Before joining a cohort, students put pictures of themselves on imgur and enter their names and image URLs into a Google form 
2. Google puts all entries into a Google Sheet (automatically)
3. HR staff enters additional information on the sheet (e.g. cohort name)
4. Familihr software uses the Google sheet as the single source of student information (card and deck definition)
5. Familihr also uses 2 Mongo models:
   * Users: name, password and ID of registered users of the Familihr software
   * Familiarities: captures how well each registered user remembers each card



## Team

  - Kay Albito
  - J-G Demathieu
  - David Deng
  - Jeffrey Milberger

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Terminology:
Card: 
Deck: a group of cards defined in the Google spreadsheet 
Quiz: 

=== Google Form modifications ===
HR staff can modify the sample Google Form:
* Important: do not modify the date field used to identify a specific student


=== Make a Card Deck ===

1. In order to have images to be uploaded via Google Spreadsheet, you need to create external image hosting; we recommened using imgur. We do not recommened Google Drive, as it doesn't render correctly without adding them to the professional Google Business group and paying for it. 

2. Fill out Google Spreadsheet with the first and last names, cohort name, and imgur .jpg url. 

3. Once all of the fields are filled out, the card deck will be automatically created and shown in the quiz deck. 


=== Sign Up and Log In ===

In order to access the cards and track your progress, you must sign up and log in. 


=== Quiz Yourself ===

Open the website on your laptop and click on a deck to start quizzes, where you'll be shown the pictures of the cohort's members. Click "Show me the answer" when you think of a name for that person. If you got that person's name right, click "Yes!"; if you were partially correct, click "Meh"; if you didn't get it yet, click "Nope". The app will show you the card more often if you answered "Nope" to that person, and less often if you're confident that you know him/her. If you have cards in the green section, they will not be shown until they are considered urgent and moved to the orange section.


## Requirements

- body-parser: "^1.17.1",
- chai: "^3.5.0",
- connect-ensure-login: "^0.1.1",
- cookie-parser: "^1.4.3",
- dotenv: "^4.0.0",
- express: "^4.15.2",
- express-session: "^1.15.1",
- grunt: "^1.0.1",
- grunt-contrib-concat: "^1.0.0",
- grunt-contrib-cssmin: "^1.0.1",
- grunt-contrib-uglify: "^1.0.1",
- grunt-contrib-watch: "^1.0.0",
- grunt-eslint: "^18.0.0",
- grunt-mocha-test: "^0.12.7",
- grunt-nodemon: "^0.4.1",
- grunt-shell: "^1.2.1",
- grunt-webpack: "^2.0.1",
- jquery: "^3.2.0",
- mocha: "^3.2.0",
- mongodb: "^2.2.24",
- mongoose: "^4.9.0",
- nodemon: "^1.11.0",
- passport: "^0.3.2",
- passport-local: "^1.0.0",
- react: "^15.4.2",
- react-dom: "^15.4.2",
- react-router: "^4.0.0",
- request: "^2.81.0"
- axios: "^0.15.3",
- babel-cli: "^6.7.5",
- babel-core: "^6.24.0",
- babel-loader: "^6.4.1",
- babel-preset-es2015: "^6.24.0",
- babel-preset-react: "^6.23.0",
- babel-register: "^6.7.2",
- enzyme: "^2.7.1",
- eslint-config-hackreactor: "git://github.com/reactorcore/eslint-config-hackreactor",
- webpack: "^2.2.1"


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g mongodb
npm install
```

### Starting the Dev Enviroment

From within the root directory:

```sh
npm start
npm run react-dev

choose either: 
npm run db
or for a background process, 
npm run bkgrnd-db
```

### Running tests

From within the root directory to run all tests: 

```sh
npm test
```

to run the server tests:
```sh
grunt test
```


### Roadmap

View the project roadmap: https://docs.google.com/spreadsheets/d/1PSIhSFkC3L9zVjc7R8dG5MlChLU9AGBiAOxqbMcarJw/edit#gid=0


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

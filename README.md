[![CircleCI](https://circleci.com/bb/district01/rare_app_nodejs.svg?style=svg&circle-token=dfcb57f788ad4324fe27ad6ec8bbe89a90edea9e)](https://circleci.com/bb/district01/rare_app_nodejs)

# R.A.R.E. v1.0.0 #
Eucobat Rare

# Table of contents #

* [Setup](#setup)
    * [System Dependencies](#system-dependencies)
    * [Init](#init)
* [Codebase](#codebase)
    * [Structure](#structure)
    * [External Services](#external-services)
    * [NPM Scripts](#npm-scripts)
* [Code Contribution](#code-contribution)
    * [Guidelines](#guidelines)
    * [Branches](#branches)
* [Environments](#environments)
    * [Development](#development)
    * [Staging](#staging)
* [Procedures](#procedures)
    * [Deployment](#deployment)
* [Project Context](#project-context)
    * [Details](#details)
    * [Team](#team)

---
## Setup ##

### System Dependencies ###

#### Deploy
[Docker](https://docs.docker.com/)

#### Development
[Docker](https://docs.docker.com/)<br>
[Node (Carbon)](https://nodejs.org/)<br>

### Init ###

* `docker-compose up --build`
* `The front-end runs on port 4350`

NOTE: Sometimes the front-end application doens't compiles, to fix this you need to edit a file and the front-end will recompile itself

---
## Codebase ##

### Structure ###

* **client/**: Contains the front-end
    * **e2e/**: Contains the end-to-end tests
    * **scripts/**: Contains translation scripts
    * **src/**: Contains the angular setup.
        * **app/**: Contains app code
        * **assets/**: Contains the assets.
        * **enviroments/**: Contains the enviroments.
        * **lib/**: Contains shared files
* **server/**: Contains the back-end
    * **config/**: Contains the back-end config
    * **controllers/**: Contains back-end controllers
    * **data/**: Contains data
    * **fixtures/**: Contains fixtures
    * **helpers/**: Contains helpers
    * **middelware/**: Contains middelware
    * **models/**: Contains models
    * **routes/**: Contains routes
    * **test/**: Contains tests

### External Services ###

This project implements several external services:

* **RARE API**: RARE API.

### NPM Scripts ###

#### Client Scripts ####

| Command               | Description
| --------------------- | -----------
| ng                    | Angular general
| start                 | Start the project
| build                 | Build the project
| test                  | Run tests
| lint                  | Run linter
| e2e                   | Run end to end tests
| translate:extract     | Extract all translations
| translate:jsonToPot   | json to pot
| translate:poToJson    | po to json
| compodoc              | generate angular compodocs in ./documentation

All commands are executable by running ``docker-compose exec app `npm run [COMMAND-NAME]` ``.
---

#### Server Scripts ####

| Command               | Description
| --------------------- | -----------
| start                 | Start the project
| lint                  | Run linter
| clean:coverage        | Cleans the tests coverage
| pretest               | Runs pretest
| test                  | Runs the tests
| posttest              | Runs linter
| open:coverage         | Opens the coverage
| projectsheet          | Opens the projectsheet

All commands are executable by running ``docker-compose exec server `npm run [COMMAND-NAME]` ``.
---

## Code Contribution ##

### Guidelines ###

#### Code Linting ####

We use tslint for staying consistent in code-style. Linting can be done by running ``docker-compose exec app `npm run lint` ``.

### Branches ###

We follow these naming conventions:

* **master**: Production-ready code.
* **develop**: Development code.
* **release/***: Snapshot of a release.
* **feature/***: For developing new features.
* **bugfix/***: For bugs that are logged during testing.
* **hotfix/***: Only for hotfixing critical bugs from the `master`-branch.

---
## Environments ##

### Development ###

The development environment receives automatic builds when code is contributed to the `development`-branch. This environment is expected to break from time to time and thus should be used for **internal testing only**!

**URL**: [https://rare-o.studiohyperdrive.be](https://rare-o.studiohyperdrive.be)

### Staging ###

The staging environment receives automatic builds when code is contributed to the `master`-branch. This environment is expected to remain stable and should be used for **client validation testing**.

**URL**: [https://rare-a.studiohyperdrive.be](https://rare-a.studiohyperdrive.be)

### Production ###

There is no production environment available at the moment

---
## Procedures ##

### Deployment ###

Deployment is handled by CircleCI.

#### Development ####

Automatic deploy after build or by a manually trigger in CircleCI.

#### Staging ####

By a manually trigger in CircleCI.

#### Production ####

Not yet available

---
## Project Context ##

This project is a Studio Hyperdrive team effort.

### Details ###

* **Client**: Eucobat
* **Start**: 18/12/2018
* **Jira Board**: https://district01.atlassian.net/secure/RapidBoard.jspa?projectKey=RE&rapidView=73
* **Bitbucket Repository**: https://district01.atlassian.net/secure/RapidBoard.jspa?rapidView=74&view=planning.nodetail
* **Design**: https://projects.invisionapp.com/share/S9PS1QNE243#/screens/339060362

### Team ###

List the team that has worked on this project, including the duration e.g.:

* [Pieterjan Van Saet - Studio Hyperdrive](mailto:pieterjan.vansaet@studiohyperdrive.be)
    * **Function**: Frontend developer
    * **Period**: December 2018 -> February 2019
* [Jeroen Valcke - Studio Hyperdrive](mailto:jeroen.valcke@studiohyperdrive.be)
    * **Function**: Backend developer
    * **Period**: December 2018 -> ...
* [Kim Janssens - Studio Hyperdrive](mailto:kim.janssens@studiohyperdrive.be)
    * **Function**: Frontend developer
    * **Period**: January 2019 -> March 2019
* [Jasper De Smet - Studio Hyperdrive](mailto:jasper.desmet@studiohyperdrive.be)
    * **Function**: Frontend / Backend developer
    * **Period**: January 2019 -> February 2019
* [Jo Smets - Studio Hyperdrive](mailto:jo.smets@studiohyperdrive.be)
    * **Function**: Frontend developer
    * **Period**: February 2019 -> ...
* [Jochem Janssens - Studio Hyperdrive](mailto:jochem.janssens@studiohyperdrive.be)
    * **Function**: Frontend developer
    * **Period**: February 2019 -> ...
* [Denis Valcke - Studio Hyperdrive](mailto:denis.valcke@studiohyperdrive.be)
    * **Function**: Backend developer
    * **Period**: February 2019 -> ...
* [Aline Vanliefland - Studio Hyperdrive](mailto:aline.vanliefland@studiohyperdrive.be)
    * **Function**: Project Manager
    * **Period**: February 2019 -> ...

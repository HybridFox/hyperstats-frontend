[![CircleCI](https://circleci.com/bb/district01/rare_app_nodejs.svg?style=svg&circle-token=dfcb57f788ad4324fe27ad6ec8bbe89a90edea9e)](https://circleci.com/bb/district01/rare_app_nodejs)

# R.A.R.E. v1.0.0 #
Eucobat Rare

# Table of contents #

* [Setup](#setup)
    * [System Dependencies](#system-dependencies)
    * [Init](#init)
* [Codebase](#codebase)
    * [Structure](#structure)
    * [NPM Scripts](#npm-scripts)
* [Code Contribution](#code-contribution)
    * [Guidelines](#guidelines)
    * [Branches](#branches)
* [Environments](#environments)
* [Procedures](#procedures)
    * [Deployment](#deployment)
    * [Start Stop](#start-stop)
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

---
## Codebase ##

### Structure ###
* **src/**: Contains the angular setup.
  * **app/**: Contains the frontend
  * **assets/**: Contains the assets.
  * **enviroments/**: Contains the enviroments.
  * **lib/**: Contains shared files
* **e2e/**: Contains the end to end tests.

### External Services ###

This project implements several external services:

* **RARE API**: RARE API.


### NPM Scripts ###

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

## Code Contribution ##

### Guidelines ###


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

**URL**: [https://to-do-o.dev](https://to-do-o.dev)

### Staging ###

The staging environment receives automatic builds when code is contributed to the `master`-branch. This environment is expected to remain stable and should be used for **client validation testing**.

**URL**: [https://to-do-a.dev](https://to-do-a.dev)

### Production ###

The production environment is built manually from the `master`-branch. This environment has to be **stable at all times**. No unvalidated code can be deployed on this environment.

**URL**: [https://to-do-p.dev](https://to-do-p.dev)


---
## Procedures ##

### Deployment ###

Deployment is handled by CircleCI.

#### Development ####

Automatic deploy after build or by a manually trigger in CircleCI.

#### Staging ####

By a manually trigger in CircleCI.

#### Production ####

By a manually trigger in CircleCI.

### Start Stop ###

TODO

---
## Project Context ##

This project is a Studio Hyperdrive team effort.

### Details ###

* **Client**: Eucobat
* **Start**: 18/12/2018
* **Jira Board**: https://district01.atlassian.net/secure/RapidBoard.jspa?projectKey=RE&rapidView=73
* **Drive Folder**: https://drive.google.com/drive/folders/1dH2U7hfnWqWqzhAHcVK6JhlwXJc1bX58

### Team ###

List the team that has worked on this project, including the duration e.g.:

* [Pieterjan Van Saet - Studio Hyperdrive](mailto:pieterjan.vansaet@studiohyperdrive.be)
    * **Function**: Frontend developer
    * **Period**: December 2018 -> ...
* [Jeroen Valcke - Studio Hyperdrive](mailto:jeroen.valcke@studiohyperdrive.be)
    * **Function**: Backend developer
    * **Period**: December 2018 -> ...

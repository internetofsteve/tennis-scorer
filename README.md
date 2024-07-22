# tennis-scorer

A GUI-less, CLI-less, but certainly not POINT-less tennis scoring system. Written in Typescript

## Prerequisites

### Node.js

Ensure you have the expected version of [Node.js](https://nodejs.org/en). If you use a Node version manager such as [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm), you can switch to the expected version by:

1. cd into the project root `cd tennis-scorer`
2. `nvm use`

## Installation

Simply run `npm install`

### Run

For an example tennis match, run the command `npm start` but note this will be a fairly boring experience
as no logging is configured

### Run Tests

 `npm test` covers the various ways a game can be scored

### Assumptions

- A tennis match can only have 2 players (I.e. it is a game of _singles_, not _doubles_)
- Players never have the same name
- The only way to progress a game is through the `pointWonBy` method
- Match consists only of 1 set

# Contributing

## Check the issues

Check the issues for a related feature or bug. If nothing exists, create one.


## Fork the repository

Fork the repository to get started. Be sure to disable the `deploy.yml` Github Action to avoid attempting to publish when you add your changes.


## Development

Install dependencies:

```
yarn install
```

To develop the extension, open the code base in Visual Studio Code and hit F5. You can also open the Run/Debug tab (4th from the top) and press the Run button. Make sure you have "Extension" selected.


### Tests

Run tests with the following command:

```
yarn test
```

A Visual Studio Code launch configuration has also been provided.

Tests can also be run in WebStorm using the play buttons that appear on the UI.


## Distribution

You can build the extension into a `.vsix` package by running:

```
yarn package
```

You can install this locally to test your packaged changes.
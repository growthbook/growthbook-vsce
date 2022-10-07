# GrowthBook Visual Studio Code extension

This extension allows you to see available Feature information in your project.

- [Usage](#usage)
- [Development](#development)
  - [Tests](#tests)

## Usage

In order to use the extension, your project will need to have a `.growthbook.json` file. Here's a sample one:

```json
{
  "featuresHost": "http://localhost:3100",
  "featuresKey": "key_dev_abc123xyz456",
  "appHost": "http://localhost:3100"  
}
```

❗️ **Note**: We recommend that you omit this file from your project's version control and provide a sample `.growthbook.json.example` file that your team can copy locally, e.g. `cp .growthbook.json.example .growthbook.json`.


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
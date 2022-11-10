# GrowthBook Visual Studio Code extension

- [About](#about)
  - [Features List](#features-list)
    - [Viewing feature details](#viewing-feature-details)
    - [Copying a feature key](#copying-a-feature-key)
    - [Editing a feature](#editing-a-feature)
- [Configuration](#configuration)
  - [Commands](#commands)
- [Contributing](#contributing)


## About

The GrowthBook Visual Studio Code extension allows you to see your available feature definitions right in VS Code.

It can be configured to work with your project in under a minute and makes it easier for developers who use VS Code to work with the GrowthBook SDK by making features browsable and conveniently surfacing common actions.

![](https://user-images.githubusercontent.com/113377031/200070541-2084b707-4469-4521-aa5e-389de1245ff8.gif)

### Features List

Once the GrowthBook extension is installed and configured, you will be able to see all of the features for your project in a view panel at the bottom left.

<img src="https://user-images.githubusercontent.com/113377031/200067932-c67397d3-e5b4-4bf7-b895-2f568b23b137.png" width="381" />


#### Viewing feature details

You should be able to see the value type of the feature inline beside the feature name. When you hover over the feature, you should see all of the criteria specified in order for this feature to evaluate. In the below example, hovering over `dark_mode` shows that it has a default value of false and will evaluate to true for 50% of logged in users.

<img src="https://user-images.githubusercontent.com/113377031/200067668-19fbfc74-8efc-4b1e-a608-166a46c3f5ae.png" width="490">

<img src="https://user-images.githubusercontent.com/113377031/200067764-1423ee86-9016-4207-bbb3-666d706a63e3.png" width="492">


#### Copying a feature key

When hovering over a feature item, some action icons will appear on the right. One of them will allow you to copy the feature key to the clipboard so you can easily copy and paste into your project.

<img src="https://user-images.githubusercontent.com/113377031/200067713-a7204eaa-ab7a-49d8-8954-7993bf69c138.png" width="420" />

Once it's been successfully copied, you should see a message pop up temporarily in the bottom right.

<img src="https://user-images.githubusercontent.com/113377031/200067983-f4da1ba6-aed7-4cd5-8406-803a8e901afa.png" width="377">


#### Editing a feature

When hovering over a feature item, some action icons will appear on the right. One of them will allow you to open the feature edit screen in your browser on the GrowthBook dashboard, allowing you to view additional details and edit your feature.

<img src="https://user-images.githubusercontent.com/113377031/200068168-46d9f5b7-f47d-4760-bc48-d6792656afb6.png" width="377">

<img src="https://user-images.githubusercontent.com/113377031/200068129-dcd73309-e389-4947-9a75-d1ee8ef1af9b.png" width="323">



## Configuration

In order to use the extension, your project will need to have a `.growthbook.json` file. 

You can create this configuration in one of the following ways:

- Use the `"Add Configuration"` button that shows up in the Features panel
- Use the command `GrowthBook: Create a .growthbook.json configuration file`.
- Manually create it by copy pasting the below code and including your own key after `/features/`

```json
{
  "featuresEndpoint": "http://localhost:3100/api/features/key_dev_abc123xyz456",
  "appHost": "http://localhost:3100"  
}
```

- `**featuresEndpoint**`: This is available on the [Environments &rarr; SDK Endpoints](https://app.growthbook.io/environments) screen in GrowthBook
- `**appHost**`: This is the URL for the running application instance of GrowthBook. If you registered at growthbook.com, use the one that is generated for you, otherwise specify the URL of your self-hosted instance.

❗️ **Note**: We recommend that you omit this file from your project's version control and provide a sample `.growthbook.json.example` file that your team can copy locally, e.g. `cp .growthbook.json.example .growthbook.json`.


### Commands

Some commands have been surfaced to help with configuring GrowthBook. You can access these commands from the command palette (by pressing <kbd>Command + Shift + P</kbd> on macOS or <kbd>Control + Shift + P</kbd> on Windows and Linux) and typing `GrowthBook`.

- Refresh features
- Create GrowthBook config


## Contributing

See the [Contributing Guide](CONTRIBUTING.md) to help out with the project.
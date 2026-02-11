# n8n-nodes-maxun

This is an n8n community node for [Maxun](https://maxun.dev) - a no-code web data extraction and scraping automation platform.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- **Robot Management**: List, get, and delete your extraction robots
- **Run Execution**: Start robot runs, get status, retrieve results, and abort runs
- **Dynamic Selection**: Robot dropdowns are populated automatically from your Maxun account
- **Flexible Configuration**: Support for custom URLs, max rows, and stealth mode

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm

```bash
npm install n8n-nodes-maxun
```

### Using n8n Desktop/Cloud

1. Go to **Settings** > **Community Nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-maxun`
4. Click **Install**

## Credentials

To use this node, you need a Maxun API key:

1. Log in to your [Maxun dashboard](https://app.maxun.dev)
2. Go to **Settings** > **API Keys**
3. Create a new API key
4. Copy the API key and use it in the n8n credentials

## Operations

### Robot

| Operation | Description |
|-----------|-------------|
| **Get Many** | Get all robots in your account |
| **Get** | Get a specific robot by ID |
| **Delete** | Delete a robot |

### Run

| Operation | Description |
|-----------|-------------|
| **Start** | Start executing a robot |
| **Get Status** | Get the status of a robot run |
| **Get Results** | Get the extracted data from a completed run |
| **Get Many** | Get all runs for a robot |
| **Abort** | Abort a running robot execution |

## Example Workflow

Here's a simple workflow example:

1. **Trigger**: Schedule trigger (e.g., every day at 9 AM)
2. **Maxun Node**: Start a robot run
3. **Wait Node**: Wait for 30 seconds
4. **Maxun Node**: Get run results
5. **Google Sheets Node**: Save results to a spreadsheet

## Resources

- [Maxun Website](https://maxun.dev)
- [Maxun Documentation](https://docs.maxun.dev)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)

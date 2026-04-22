# mcp-rickmorty

Rick and Morty MCP — wraps The Rick and Morty API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_character` | Get full character details by ID. Returns name, species, status, origin world, current location, and episode list. |
| `get_location` | Get location details by ID. Returns name, type, dimension, and list of characters found there. |
| `get_episode` | Get episode details by ID. Returns title, air date, season and episode number, and character appearances. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "rickmorty": {
      "url": "https://gateway.pipeworx.io/rickmorty/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Rickmorty data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

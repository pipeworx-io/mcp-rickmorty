# mcp-rickmorty

MCP server for [The Rick and Morty API](https://rickandmortyapi.com/). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `search_characters` | Search for characters by name |
| `get_character` | Get detailed info about a character by ID |
| `get_location` | Get details about a location by ID |
| `get_episode` | Get details about an episode by ID |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "rickmorty_search_characters",
      "arguments": { "name": "Rick" }
    },
    "id": 1
  }'
```

## License

MIT

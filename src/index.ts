/**
 * Rick and Morty MCP — wraps The Rick and Morty API (free, no auth)
 *
 * Tools:
 * - search_characters: Search for characters by name
 * - get_character: Get details for a specific character by ID
 * - get_location: Get details for a specific location by ID
 * - get_episode: Get details for a specific episode by ID
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://rickandmortyapi.com/api';

type RawCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  created: string;
};

type RawLocation = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
};

type RawEpisode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
};

type RawListResponse<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

function formatCharacter(c: RawCharacter) {
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    type: c.type || null,
    gender: c.gender,
    origin: c.origin.name,
    location: c.location.name,
    image: c.image,
    episode_count: c.episode.length,
  };
}

function formatLocation(l: RawLocation) {
  return {
    id: l.id,
    name: l.name,
    type: l.type,
    dimension: l.dimension,
    resident_count: l.residents.length,
  };
}

function formatEpisode(e: RawEpisode) {
  return {
    id: e.id,
    name: e.name,
    air_date: e.air_date,
    episode: e.episode,
    character_count: e.characters.length,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'search_characters',
    description:
      'Search for Rick and Morty characters by name. Returns a list of matching characters.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Character name to search for (e.g. "Rick", "Morty", "Beth").',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_character',
    description: 'Get detailed information about a specific Rick and Morty character by their ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Character ID (e.g. 1 for Rick Sanchez).',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_location',
    description: 'Get details about a specific Rick and Morty location by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Location ID (e.g. 1 for Earth (C-137)).',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_episode',
    description: 'Get details about a specific Rick and Morty episode by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Episode ID (e.g. 1 for "Pilot").',
        },
      },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_characters':
      return searchCharacters(args.name as string);
    case 'get_character':
      return getCharacter(args.id as number);
    case 'get_location':
      return getLocation(args.id as number);
    case 'get_episode':
      return getEpisode(args.id as number);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function searchCharacters(name: string) {
  const params = new URLSearchParams({ name });
  const res = await fetch(`${BASE_URL}/character/?${params}`);
  if (!res.ok) throw new Error(`Rick and Morty API error: ${res.status}`);

  const data = (await res.json()) as RawListResponse<RawCharacter>;
  return {
    count: data.info.count,
    pages: data.info.pages,
    characters: data.results.map(formatCharacter),
  };
}

async function getCharacter(id: number) {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error(`Rick and Morty API error: ${res.status}`);

  const data = (await res.json()) as RawCharacter;
  return formatCharacter(data);
}

async function getLocation(id: number) {
  const res = await fetch(`${BASE_URL}/location/${id}`);
  if (!res.ok) throw new Error(`Rick and Morty API error: ${res.status}`);

  const data = (await res.json()) as RawLocation;
  return formatLocation(data);
}

async function getEpisode(id: number) {
  const res = await fetch(`${BASE_URL}/episode/${id}`);
  if (!res.ok) throw new Error(`Rick and Morty API error: ${res.status}`);

  const data = (await res.json()) as RawEpisode;
  return formatEpisode(data);
}

export default { tools, callTool } satisfies McpToolExport;

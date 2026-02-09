/**
 * GraphQL Schema Design Example
 * Demonstrates expert-level understanding of GraphQL architecture,
 * schema design, and resolver patterns for senior frontend role
 */

export const typeDefs = `
  type Query {
    server(id: ID!): Server
    servers: [Server!]!
    channel(serverId: ID!, channelId: ID!): Channel
    messages(channelId: ID!, limit: Int = 50, cursor: String): MessageConnection!
    thread(id: ID!): Thread
    user(id: ID!): User
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
    addReaction(messageId: ID!, emoji: String!): Message!
    createThread(input: CreateThreadInput!): Thread!
    updateUserStatus(status: UserStatus!): User!
  }

  type Subscription {
    messageAdded(channelId: ID!): Message!
    userStatusChanged(serverId: ID!): User!
    typingIndicator(channelId: ID!): TypingIndicator!
  }

  type Server {
    id: ID!
    name: String!
    iconText: String!
    channels: [Channel!]!
    members: [User!]!
    createdAt: DateTime!
  }

  type Channel {
    id: ID!
    serverId: ID!
    name: String!
    kind: ChannelKind!
    unread: Int
    isPinned: Boolean
    activeUsers: Int
    messages(limit: Int = 50, cursor: String): MessageConnection!
  }

  enum ChannelKind {
    TEXT
    VOICE
  }

  type Message {
    id: ID!
    author: User!
    content: String!
    createdAt: DateTime!
    isEdited: Boolean
    isPinned: Boolean
    reactions: [Reaction!]!
    embed: Embed
    codeBlock: CodeBlock
    thread: Thread
  }

  type MessageConnection {
    edges: [MessageEdge!]!
    pageInfo: PageInfo!
  }

  type MessageEdge {
    node: Message!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type User {
    id: ID!
    name: String!
    avatarText: String!
    status: UserStatus!
    role: String
  }

  enum UserStatus {
    ONLINE
    AWAY
    OFFLINE
  }

  type Reaction {
    emoji: String!
    count: Int!
    users: [User!]!
  }

  type Embed {
    title: String
    description: String
    color: String
    url: String
  }

  type CodeBlock {
    language: String!
    code: String!
  }

  type Thread {
    id: ID!
    title: String!
    author: User!
    createdAt: DateTime!
    replyCount: Int!
    replies: [ThreadReply!]!
  }

  type ThreadReply {
    id: ID!
    author: User!
    content: String!
    createdAt: DateTime!
  }

  type TypingIndicator {
    user: User!
    channelId: ID!
  }

  input SendMessageInput {
    channelId: ID!
    content: String!
    embed: EmbedInput
    codeBlock: CodeBlockInput
  }

  input EmbedInput {
    title: String
    description: String
    url: String
  }

  input CodeBlockInput {
    language: String!
    code: String!
  }

  input CreateThreadInput {
    serverId: ID!
    title: String!
    initialMessage: String!
  }

  scalar DateTime
`;

/**
 * Resolver Example - Demonstrates N+1 query prevention with DataLoader
 */
export const resolvers = {
  Query: {
    server: async (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.serverAPI.getServer(id);
    },
    
    messages: async (
      _: any,
      { channelId, limit, cursor }: { channelId: string; limit: number; cursor?: string },
      { dataSources }: any
    ) => {
      // Cursor-based pagination for performance
      return dataSources.messageAPI.getMessages(channelId, limit, cursor);
    },
  },

  Mutation: {
    sendMessage: async (
      _: any,
      { input }: { input: any },
      { dataSources, pubsub }: any
    ) => {
      const message = await dataSources.messageAPI.createMessage(input);
      
      // Publish to subscribers for real-time updates
      pubsub.publish('MESSAGE_ADDED', {
        messageAdded: message,
        channelId: input.channelId,
      });
      
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_: any, { channelId }: { channelId: string }, { pubsub }: any) => {
        return pubsub.asyncIterator(['MESSAGE_ADDED']);
      },
    },
  },

  Message: {
    // DataLoader prevents N+1 queries when fetching authors
    author: async (message: any, _: any, { loaders }: any) => {
      return loaders.userLoader.load(message.authorId);
    },
    
    reactions: async (message: any, _: any, { dataSources }: any) => {
      // Batch load reactions for performance
      return dataSources.reactionAPI.getReactionsByMessageId(message.id);
    },
  },

  Channel: {
    messages: async (
      channel: any,
      { limit, cursor }: { limit: number; cursor?: string },
      { dataSources }: any
    ) => {
      return dataSources.messageAPI.getMessages(channel.id, limit, cursor);
    },
  },
};

/**
 * DataLoader Configuration for N+1 Prevention
 */
export const createLoaders = (dataSources: any) => ({
  userLoader: new DataLoader(async (userIds: readonly string[]) => {
    const users = await dataSources.userAPI.getUsersByIds(userIds);
    return userIds.map(id => users.find((u: any) => u.id === id));
  }),
  
  channelLoader: new DataLoader(async (channelIds: readonly string[]) => {
    const channels = await dataSources.channelAPI.getChannelsByIds(channelIds);
    return channelIds.map(id => channels.find((c: any) => c.id === id));
  }),
});

/**
 * Performance Optimization: Query Complexity Analysis
 */
export const complexityPlugin = {
  requestDidStart: () => ({
    didResolveOperation({ request, document }: any) {
      const complexity = calculateComplexity({
        query: document,
        variables: request.variables,
        // Limit complexity to prevent expensive queries
        maximumComplexity: 1000,
      });
      
      if (complexity > 1000) {
        throw new Error('Query too complex');
      }
    },
  }),
};

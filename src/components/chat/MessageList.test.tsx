import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import { Message } from '@/lib/types';

describe('MessageList', () => {
  const mockMessages: Message[] = [
    {
      id: 'm1',
      serverId: 'test',
      channelId: 'general',
      author: {
        id: 'u1',
        name: 'Test User',
        avatarText: 'TU',
        status: 'online',
        role: 'Admin',
      },
      content: 'Test message',
      createdAt: new Date().toISOString(),
    },
  ];

  it('renders messages correctly', () => {
    render(<MessageList messages={mockMessages} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays empty state when no messages', () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it('renders code blocks when present', () => {
    const messagesWithCode: Message[] = [
      {
        ...mockMessages[0],
        codeBlock: {
          language: 'typescript',
          code: 'const x = 1;',
        },
      },
    ];
    render(<MessageList messages={messagesWithCode} />);
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders embeds when present', () => {
    const messagesWithEmbed: Message[] = [
      {
        ...mockMessages[0],
        embed: {
          title: 'Test Embed',
          description: 'Embed description',
        },
      },
    ];
    render(<MessageList messages={messagesWithEmbed} />);
    expect(screen.getByText('Test Embed')).toBeInTheDocument();
    expect(screen.getByText('Embed description')).toBeInTheDocument();
  });

  it('renders reactions with counts', () => {
    const messagesWithReactions: Message[] = [
      {
        ...mockMessages[0],
        reactions: [
          { emoji: '👍', count: 5 },
          { emoji: '🚀', count: 3 },
        ],
      },
    ];
    render(<MessageList messages={messagesWithReactions} />);
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

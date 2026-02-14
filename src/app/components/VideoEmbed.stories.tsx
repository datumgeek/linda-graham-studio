import type { Meta, StoryObj } from '@storybook/react';
import { VideoEmbed } from './VideoEmbed';

const meta: Meta<typeof VideoEmbed> = {
  title: 'Components/VideoEmbed',
  component: VideoEmbed,
  tags: ['autodocs'],
  args: {
    className: 'w-[640px] aspect-video',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPoster: Story = {
  args: {
    src: 'https://content.jwplatform.com/players/RJS7Qcdi-S3u9V5Nq.html',
    title: 'Multiverse 3',
    posterSrc: 'https://picsum.photos/seed/video/640/360',
  },
};

export const WithoutPoster: Story = {
  args: {
    src: 'https://content.jwplatform.com/players/RJS7Qcdi-S3u9V5Nq.html',
    title: 'Multiverse 3',
  },
};

export const ErrorState: Story = {
  args: {
    src: 'https://example.com/nonexistent-video',
    title: 'Unavailable Video',
  },
  render: (args) => {
    // Simulate the error state by wrapping
    return <VideoEmbed {...args} />;
  },
};

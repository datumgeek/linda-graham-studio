import type { Meta, StoryObj } from '@storybook/react';
import { ArtworkImage } from './ArtworkImage';

const meta: Meta<typeof ArtworkImage> = {
  title: 'Components/ArtworkImage',
  component: ArtworkImage,
  tags: ['autodocs'],
  args: {
    alt: 'Artwork detail',
    className: 'w-96 h-64 object-cover rounded-lg',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/art/750/500',
  },
};

export const BrokenFallback: Story = {
  args: {
    src: 'https://example.com/no-image.jpg',
    alt: 'Missing sculpture photo',
    fallbackClassName: 'w-96 h-64 rounded-lg',
  },
};

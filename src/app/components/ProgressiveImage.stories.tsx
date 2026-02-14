import type { Meta, StoryObj } from '@storybook/react';
import { ProgressiveImage } from './ProgressiveImage';

const meta: Meta<typeof ProgressiveImage> = {
  title: 'Components/ProgressiveImage',
  component: ProgressiveImage,
  tags: ['autodocs'],
  args: {
    alt: 'Clay sculpture',
    className: 'w-64 h-64 rounded-lg',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/clay/500/500',
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/seed/clay/500/500',
    placeholderSrc: 'https://picsum.photos/seed/clay/50/50',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://example.com/does-not-exist.jpg',
    alt: 'Missing artwork',
  },
};

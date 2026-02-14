import type { Meta, StoryObj } from '@storybook/react';
import { ColorPalette } from './ColorPalette';

const meta: Meta<typeof ColorPalette> = {
  title: 'Components/ColorPalette',
  component: ColorPalette,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NaturalSelection: Story = {
  args: {
    colors: ['#5E7944', '#C9A96E', '#D4736C', '#8B6F4E', '#E8DDD0'],
  },
};

export const Binaries: Story = {
  args: {
    colors: ['#0D0D0D', '#4A0E4E', '#2ECC71', '#E74C3C', '#F5F5DC'],
  },
};

export const ElectromagneticTransformation: Story = {
  args: {
    colors: ['#00CED1', '#FF6EC7', '#1A1A2E', '#9B59B6', '#F0E68C'],
  },
};

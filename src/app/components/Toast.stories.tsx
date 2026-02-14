import type { Meta, StoryObj } from '@storybook/react';
import { useToast, ToastProvider } from './Toast';

function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="btn btn-info btn-sm"
        onClick={() => addToast('Info message — something happened.', 'info')}
      >
        Info Toast
      </button>
      <button
        className="btn btn-success btn-sm"
        onClick={() => addToast('Success! Action completed.', 'success')}
      >
        Success Toast
      </button>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => addToast('Warning — check your input.', 'warning')}
      >
        Warning Toast
      </button>
      <button
        className="btn btn-error btn-sm"
        onClick={() => addToast('Error occurred. Please retry.', 'error')}
      >
        Error Toast
      </button>
    </div>
  );
}

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ToastDemo />,
};

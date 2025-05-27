import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorButton } from './CalculatorButton';

const meta: Meta<typeof CalculatorButton> = {
  title: 'Calculator/Button',
  component: CalculatorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    colorScheme: {
      control: 'select',
      options: ['brand', 'blue', 'green', 'red', 'orange', 'teal', 'purple'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CalculatorButton>;

export const Default: Story = {
  args: {
    label: '1',
    variant: 'solid',
    colorScheme: 'brand',
  },
};

export const Operator: Story = {
  args: {
    label: '+',
    variant: 'solid',
    colorScheme: 'orange',
  },
};

export const Function: Story = {
  args: {
    label: 'sin',
    variant: 'solid',
    colorScheme: 'teal',
  },
};

export const Clear: Story = {
  args: {
    label: 'Clear',
    variant: 'solid',
    colorScheme: 'red',
  },
};

export const Outline: Story = {
  args: {
    label: 'Mode',
    variant: 'outline',
    colorScheme: 'purple',
  },
}; 
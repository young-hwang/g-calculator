import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorDisplay } from './CalculatorDisplay';

const meta: Meta<typeof CalculatorDisplay> = {
  title: 'Calculator/Display',
  component: CalculatorDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    expression: { control: 'text' },
    result: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CalculatorDisplay>;

export const Default: Story = {
  args: {
    expression: '',
    result: '0',
  },
};

export const WithExpression: Story = {
  args: {
    expression: '2 + 2',
    result: '4',
  },
};

export const WithError: Story = {
  args: {
    expression: '2 / 0',
    result: '',
    error: 'Division by zero',
  },
};

export const LongExpression: Story = {
  args: {
    expression: '1234567890 + 9876543210',
    result: '11111111100',
  },
}; 
import type { Meta, StoryObj } from '@storybook/react';
import { Calculator } from './Calculator';
import { CalculatorProvider } from '../../state/calculator/CalculatorContext';

const meta: Meta<typeof Calculator> = {
  title: 'Calculator/Calculator',
  component: Calculator,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CalculatorProvider>
        <Story />
      </CalculatorProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Calculator>;

export const Default: Story = {};

export const WithHistory: Story = {
  parameters: {
    mockData: {
      history: [
        { expression: '2 + 2', value: '4', timestamp: new Date().toISOString() },
        { expression: '10 * 5', value: '50', timestamp: new Date().toISOString() },
      ],
    },
  },
}; 
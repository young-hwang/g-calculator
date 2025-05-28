import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorHistory } from './CalculatorHistory';
import type { CalculationResult } from '../../../entities/CalculationResult';

const mockHistory: CalculationResult[] = [
  { expression: '2 + 2', value: '4', timestamp: new Date().toISOString() },
  { expression: '10 * 5', value: '50', timestamp: new Date().toISOString() },
  { expression: '100 / 4', value: '25', timestamp: new Date().toISOString() },
];

const meta: Meta<typeof CalculatorHistory> = {
  title: 'Calculator/History',
  component: CalculatorHistory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    history: { control: 'object' },
    onClearHistory: { action: 'clearHistory' },
    onSelectHistoryItem: { action: 'selectHistoryItem' },
  },
};

export default meta;
type Story = StoryObj<typeof CalculatorHistory>;

export const Empty: Story = {
  args: {
    history: [],
    onClearHistory: () => {},
    onSelectHistoryItem: () => {},
  },
};

export const WithHistory: Story = {
  args: {
    history: mockHistory,
    onClearHistory: () => {},
    onSelectHistoryItem: () => {},
  },
};

export const LongHistory: Story = {
  args: {
    history: [
      ...mockHistory,
      { expression: '1234567890 + 9876543210', value: '11111111100', timestamp: new Date().toISOString() },
      { expression: 'sin(45)', value: '0.7071', timestamp: new Date().toISOString() },
      { expression: 'cos(60)', value: '0.5', timestamp: new Date().toISOString() },
    ],
    onClearHistory: () => {},
    onSelectHistoryItem: () => {},
  },
}; 
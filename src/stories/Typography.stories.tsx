import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component: 'Типографика проекта, сгруппированная по стандартным текстовым стилям: заголовки, тексты, ссылки.'
      }
    }
  }
} satisfies Meta<unknown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Массив всех классов из $text-styles
const textStyles = [
  'h1',
  'h2',
  'h3',
  'regular-text-16',
  'bold-text-16',
  'regular-text-14',
  'medium-text-14',
  'bold-text-14',
  'small-text',
  'semi-bold-small-text',
  'regular-link',
  'small-link'
];

export const TypographyStories: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-family-primary)' }}>
      {textStyles.map((styleName) => (
        <div key={styleName} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '12px', color: '#555' }}>{styleName}</span>
          <span className={styleName}>Пример текста для класса {styleName}</span>
        </div>
      ))}
    </div>
  )
};

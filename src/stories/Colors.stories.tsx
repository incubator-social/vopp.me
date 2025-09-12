import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Foundations/UI Pallete Colors',
  parameters: {
    docs: {
      description: {
        component: 'Палитра цветов проекта, сгруппированная по типам: Accent, Success, Danger, Warning, Dark и Light.'
      }
    }
  }
} satisfies Meta<unknown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Определяем группы цветов и их CSS-переменные
const colorGroups: Record<string, string[]> = {
  Accent: [
    '--color-accent-100',
    '--color-accent-300',
    '--color-accent-500',
    '--color-accent-700',
    '--color-accent-900'
  ],
  Success: [
    '--color-success-100',
    '--color-success-300',
    '--color-success-500',
    '--color-success-700',
    '--color-success-900'
  ],
  Danger: [
    '--color-danger-100',
    '--color-danger-300',
    '--color-danger-500',
    '--color-danger-700',
    '--color-danger-900'
  ],
  Warning: [
    '--color-warning-100',
    '--color-warning-300',
    '--color-warning-500',
    '--color-warning-700',
    '--color-warning-900'
  ],
  Dark: ['--color-dark-100', '--color-dark-300', '--color-dark-500', '--color-dark-700', '--color-dark-900'],
  Light: ['--color-light-100', '--color-light-300', '--color-light-500', '--color-light-700', '--color-light-900']
};

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'var(--font-family-primary)' }}>
      {Object.entries(colorGroups).map(([groupName, vars]) => (
        <div key={groupName}>
          <h3 style={{ marginBottom: '0.5rem' }}>{groupName}</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {vars.map((varName) => (
              <div
                key={varName}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}
              >
                <div
                  style={{
                    backgroundColor: `var(${varName})`,
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid #ccc'
                  }}
                />
                <span style={{ fontSize: '12px', textAlign: 'center' }}>{varName.replace('--color-', '')}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

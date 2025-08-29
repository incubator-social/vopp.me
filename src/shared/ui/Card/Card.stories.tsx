import { Meta, StoryObj } from '@storybook/nextjs-vite';
import styles from './Card.module.scss';
import Card, { CardProps } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        gray: { name: 'gray', value: '#373737' },
        dark: { name: 'dark', value: '#191919' }
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args: CardProps) => {
  return <Card className={args.className}>{args.children}</Card>;
};

export const Default: Story = {
  render: Template,
  args: {
    children: <div>Default</div>
  }
};

export const Signup: Story = {
  render: Template,
  args: {
    className: styles['sign-up'],
    children: (
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <div className={styles.icons}></div>
        <div className={styles.form}></div>
        <div className={styles.terms}></div>
        <button className={styles.button}>
          <h3>Sign Up</h3>
        </button>
        <p className={styles['account-text']}>Do you have an account?</p>
        <span className={styles['sign-in']}>
          <a className={styles['sign-in-link']}>Sign In</a>
        </span>
      </div>
    )
  }
};

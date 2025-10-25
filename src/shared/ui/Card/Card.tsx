'use client';

import { ReactNode } from 'react';
import styles from './Card.module.scss';
import { clsx } from 'clsx';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx(styles.card, className)}>{children}</div>;
};

export default Card;

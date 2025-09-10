'use client';

import { ReactNode } from 'react';
import styles from './Card.module.scss';
import { clsx } from 'clsx';

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx(styles.card, className)}>{children}</div>;
};

export default Card;

//types
export type CardProps = {
  children: ReactNode;
  className?: string;
};

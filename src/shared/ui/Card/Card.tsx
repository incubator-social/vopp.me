'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './Card.module.scss';

const Card = ({ children, className }: CardProps) => {
  const combinedClassName = clsx(styles.card, className);
  return <div className={combinedClassName}>{children}</div>;
};

export default Card;

//types
export type CardProps = {
  children: ReactNode;
  className?: string;
};

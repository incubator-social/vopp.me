import { ReactNode } from 'react';
import styles from './Card.module.scss';

const Card = ({ children, className }) => {
  return <div className={className || styles.card}>{children}</div>;
};

export default Card;

type CardProps = {
  children: ReactNode;
  className?: string;
};

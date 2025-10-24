import { clsx } from 'clsx';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ALink.module.scss';

export type ALinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: '_blank' | '_self';
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ALink = ({ children, href, className, target = '_self', ...props }: ALinkProps) => {
  return (
    <a href={href} target={target} className={clsx(styles.a, className)} {...props}>
      {children}
    </a>
  );
};

export default ALink;

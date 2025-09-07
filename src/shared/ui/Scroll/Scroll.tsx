'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';
import styles from './Scroll.module.scss';

const Scroll = ({ children, type = ScrollType.auto, viewportAsChild = false }: ScrollAreaProps) => {
  return (
    <ScrollArea.Root className={styles.root} type={type}>
      <ScrollArea.Viewport className={styles.viewport} {...(viewportAsChild ? { asChild: true } : {})}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles['scroll-bar']} orientation={'horizontal'}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={styles['scroll-bar']} orientation={'vertical'}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default Scroll;

//type
export type ScrollAreaProps = {
  children: ReactNode;
  type?: ScrollType;
  viewportAsChild?: boolean;
};

export enum ScrollType {
  auto = 'auto',
  always = 'always',
  scroll = 'scroll',
  hover = 'hover'
}

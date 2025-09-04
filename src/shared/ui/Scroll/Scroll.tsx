'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';
import styles from './Scroll.module.scss';

const Scroll = ({ children, type }: ScrollAreaProps) => {
  return (
    <ScrollArea.Root className={styles.root} type={type ? type : ScrollType.always}>
      <ScrollArea.Viewport className={styles.viewport}>{children}</ScrollArea.Viewport>
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
};

enum ScrollType {
  auto = 'auto',
  always = 'always',
  scroll = 'scroll',
  hover = 'hover'
}

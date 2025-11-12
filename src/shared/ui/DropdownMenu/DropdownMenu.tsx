'use client';

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import MoreHorizontalOutline from '@/src/shared/assets/icons/more-horizontal-outline.svg';
import styles from './DropdownMenu.module.scss';
import { ReactNode } from 'react';

export type DropdownMenuItem = {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
};

type Props = {
  items: DropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
  triggerIcon?: ReactNode;
};

export const DropdownMenu = ({ items, align = 'end', triggerIcon }: Props) => {
  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger asChild>
        <button className={styles.menuButton} aria-label="Открыть меню">
          {triggerIcon ?? <MoreHorizontalOutline />}
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content className={styles.dropdownContent} sideOffset={5} align={align}>
          {items.map((item, index) => (
            <DropdownMenuRadix.Item key={index} className={styles.dropdownItem} onSelect={item.onSelect}>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </DropdownMenuRadix.Item>
          ))}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
};

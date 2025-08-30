'use client';

import * as Nav from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Sidebar.module.scss';
import { options } from './data';

const Sidebar = ({ value, onValueChange, defaultValue, isDisabledValue }: SidebarProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value || options.main[0].value);

  const handleRootValueChange = (newValue: string) => {
    if (newValue !== isDisabledValue && onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleLinkSelect = (newValue: string, action?: () => void) => {
    setSelectedValue(newValue);
    if (action) {
      action();
    }
  };

  return (
    <Nav.Root
      value={selectedValue}
      defaultValue={defaultValue}
      onValueChange={handleRootValueChange}
      orientation={'vertical'}
      className={styles.container}
    >
      <div className={styles['nav-links-container']}>
        <Nav.List className={styles['nav-list']}>
          {options.main.map(({ value, icon: Icon, activeIcon: ActiveIcon, action: action }) => (
            <Nav.Item key={value} value={value} className={styles['nav-item']}>
              <Nav.Link
                className={clsx(styles['nav-link'], 'regular-text-14')}
                active={selectedValue === value}
                onSelect={() => handleLinkSelect(value, action)}
                aria-disabled={isDisabledValue === value}
                tabIndex={0}
              >
                {selectedValue === value ? <ActiveIcon /> : <Icon />}
                <span>{value}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav.List>

        <Nav.List className={styles['nav-list']}>
          {options.other.map(({ value, icon: Icon, activeIcon: ActiveIcon, action: action }) => (
            <Nav.Item key={value} value={value} className={styles['nav-item']}>
              <Nav.Link
                className={clsx(styles['nav-link'], 'regular-text-14')}
                active={selectedValue === value}
                onSelect={() => handleLinkSelect(value, action)}
                aria-disabled={isDisabledValue === value}
                tabIndex={0}
              >
                {selectedValue === value ? <ActiveIcon /> : <Icon />}
                <span>{value}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav.List>

        <Nav.List className={styles['nav-list']}>
          {options.logout.map(({ value, icon: Icon, activeIcon: ActiveIcon, action: action }) => (
            <Nav.Item key={value} value={value} className={styles['nav-item']}>
              <Nav.Link
                className={clsx(styles['nav-link'], 'regular-text-14')}
                active={selectedValue === value}
                onSelect={() => handleLinkSelect(value, action)}
                aria-disabled={isDisabledValue === value}
                tabIndex={0}
              >
                {selectedValue === value ? <ActiveIcon /> : <Icon />}
                <span>{value}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav.List>
      </div>
    </Nav.Root>
  );
};

export default Sidebar;

//types
export type SidebarProps = {
  value?: string;
  isDisabledValue?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

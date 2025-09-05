'use client';

import * as Nav from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { options } from './data';

const Sidebar = ({ value, onValueChange, defaultValue, isDisabledValue }: SidebarProps) => {
  const selectedValue = value || options[0].id;

  const handleChangeValue = (newValue: string) => {
    if (newValue !== isDisabledValue) {
      onValueChange(newValue);
    }
  };

  return (
    <Nav.Root
      value={selectedValue}
      defaultValue={defaultValue}
      onValueChange={handleChangeValue}
      orientation={'vertical'}
      className={styles.container}
    >
      <div className={styles['nav-links-container']}>
        <Nav.List className={styles['nav-list']}>
          {options.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
            <Nav.Item key={id} value={id} className={styles['nav-item']}>
              <Nav.Link
                className={clsx(styles['nav-link'], 'regular-text-14')}
                active={selectedValue === id}
                onSelect={() => handleChangeValue(id)}
                aria-disabled={isDisabledValue === id}
                tabIndex={0}
              >
                {selectedValue === id ? <ActiveIcon /> : <Icon />}
                <span>{label}</span>
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
  value: string;
  onValueChange: (value: string) => void;
  isDisabledValue?: string;
  defaultValue?: string;
};

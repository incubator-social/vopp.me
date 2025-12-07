'use client';

import { options } from '@/src/widgets/Sidebar/data';
import * as Nav from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

export type SidebarProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  isDisabledValue?: string;
  defaultValue?: string;
};

const Sidebar = ({ value, onValueChange, defaultValue, isDisabledValue }: SidebarProps) => {
  const handleChangeValue = (newValue: string) => {
    if (newValue !== isDisabledValue) {
      onValueChange(newValue);
    }
  };

  return (
    <Nav.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleChangeValue}
      orientation={'vertical'}
      className={styles.container}
    >
      <div className={styles['nav-links-container']}>
        <Nav.List className={styles['nav-list']}>
          {options.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
            <Nav.Item key={id} value={id} className={styles['nav-item']}>
              {id === 'logout' ? (
                <button
                  type="button"
                  className={clsx(styles['nav-link'], 'regular-text-14')}
                  onClick={() => handleChangeValue(id)}
                >
                  {value === id ? <ActiveIcon /> : <Icon />}
                  <span>{label}</span>
                </button>
              ) : (
                <Nav.Link
                  className={clsx(styles['nav-link'], 'regular-text-14')}
                  active={value === id}
                  onSelect={() => handleChangeValue(id)}
                  tabIndex={0}
                >
                  {value === id ? <ActiveIcon /> : <Icon />}
                  <span>{label}</span>
                </Nav.Link>
              )}
            </Nav.Item>
          ))}
        </Nav.List>
      </div>
    </Nav.Root>
  );
};

export default Sidebar;

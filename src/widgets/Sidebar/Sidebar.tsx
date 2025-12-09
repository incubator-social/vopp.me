'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './Sidebar.module.scss';
import { options } from './data';

export const Sidebar = ({ value, onChange, disabledValue }: SidebarProps) => {
  const mainOptions = options.filter((o) => o.group === 'main');
  const actionOptions = options.filter((o) => o.group === 'actions');

  return (
    <div className={styles.container}>
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(v) => v && v !== disabledValue && onChange(v)}
        className={styles['nav-list']}
      >
        {mainOptions.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
          <div key={id} className={styles['nav-item']}>
            <ToggleGroup.Item value={id} className={styles['nav-link']}>
              {value === id ? <ActiveIcon /> : <Icon />}
              <span>{label}</span>
            </ToggleGroup.Item>
          </div>
        ))}

        {/* невидимый отступ вместо полоски */}
        <div className={styles.spacer} />

        {actionOptions.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
          <div key={id} className={styles['nav-item']}>
            <ToggleGroup.Item value={id} className={styles['nav-link']}>
              {value === id ? <ActiveIcon /> : <Icon />}
              <span>{label}</span>
            </ToggleGroup.Item>
          </div>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

export type SidebarProps = {
  value: string; // было: string
  onChange: (value: string) => void;
  disabledValue?: string | null;
};

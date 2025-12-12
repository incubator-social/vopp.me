'use client';

import * as NavMenu from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';

import { Button } from '@/src/shared/ui/Button';

import { options } from '../config';

import styles from './Sidebar.module.scss';

export type SidebarProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabledValue?: string | undefined;
};

export const Sidebar = ({ value, onValueChange, disabledValue }: SidebarProps) => {
  return (
    <NavMenu.Root value={value} onValueChange={onValueChange} className={styles.container}>
      <div>
        <NavMenu.List className={styles.navList}>
          {options.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
            <NavMenu.Item key={id} value={id} className={styles.navItem}>
              {id === 'create' || id === 'logout' ? (
                <Button
                  className={clsx(styles.navLink, styles.button, { [styles.buttonActive]: value === id })}
                  size={{ padding: 0 }}
                  variant={'buttonText'}
                  onClick={() => onValueChange(id)}
                  disabled={disabledValue === id}
                >
                  {value === id ? <ActiveIcon /> : <Icon />}
                  <span>{label}</span>
                </Button>
              ) : (
                <NavMenu.Link
                  className={clsx(styles.navLink, 'regular-text-14')}
                  active={value === id}
                  tabIndex={0}
                  onSelect={() => onValueChange(id)}
                  aria-disabled={disabledValue === id}
                >
                  {value === id ? <ActiveIcon /> : <Icon />}
                  <span>{label}</span>
                </NavMenu.Link>
              )}
            </NavMenu.Item>
          ))}
        </NavMenu.List>
      </div>
    </NavMenu.Root>
  );
};

// 'use client';
//
// import * as ToggleGroup from '@radix-ui/react-toggle-group';
//
// import { options } from '@/src/widgets/sidebar/config';
//
// import styles from './Sidebar.module.scss';
//
// export type SidebarProps = {
//   value: string | undefined
//   onChange: (value: string) => void
//   disabledValue?: boolean
// };
//
// export const Sidebar = ({ value, onChange, disabledValue }: SidebarProps) => {
//
//   return (
//     <div className={styles.container}>
//       <ToggleGroup.Root
//         type="single"
//         onValueChange={onChange}
//         className={styles['nav-list']}
//       >
//         {options.map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => {
//             return (
//               <div key={id} className={styles['nav-item']}>
//                 <ToggleGroup.Item value={id} className={styles['nav-link']}
//                                   disabled={disabledValue}
//                                   onClick={() => console.log(`Value: ${value}, Real value: ${id}`)}
//                 >
//                   {value === id ? <ActiveIcon /> : <Icon />}
//                   <span>{label}</span>
//                 </ToggleGroup.Item>
//               </div>
//             );
//           }
//         )}
//       </ToggleGroup.Root>
//     </div>
//   );
// };
//

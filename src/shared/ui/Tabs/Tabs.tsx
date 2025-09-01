import * as RadixTabs from '@radix-ui/react-tabs';
import { TabsListProps, TabsProps, TabsTriggerProps } from '@radix-ui/react-tabs';
import { ComponentProps, ReactNode } from 'react';
import styles from './Tabs.module.scss';
import { clsx } from 'clsx';

type Trigger = {
  value: string;
  trigger: ReactNode | string | number;
} & TabsTriggerProps;

type Props = {
  rootProps?: TabsProps;
  listProps?: TabsListProps;
  triggers: Trigger[];
} & ComponentProps<'div'>;

export const Tabs = ({ rootProps, listProps, triggers, children, className, ...restProps }: Props) => {
  const classNames = {
    tabsClasses: clsx(className),
    listClasses: clsx(styles.list, listProps?.className),
    triggerClasses: clsx(styles.trigger, 'h3')
  };

  return (
    <div className={classNames.tabsClasses} {...restProps}>
      <RadixTabs.Root {...rootProps} defaultValue={triggers[0].value}>
        <RadixTabs.List {...listProps} className={classNames.listClasses}>
          {triggers.map((item) => {
            const { value, trigger, className: itemClassName = '', ...triggerProps } = item;

            return (
              <RadixTabs.Trigger
                className={clsx(classNames.triggerClasses, itemClassName)}
                value={value}
                key={value}
                {...triggerProps}
              >
                {trigger}
              </RadixTabs.Trigger>
            );
          })}
        </RadixTabs.List>
        {children}
      </RadixTabs.Root>
    </div>
  );
};

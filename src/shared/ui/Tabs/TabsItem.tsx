import * as RadixTabs from '@radix-ui/react-tabs';
import { TabsContentProps } from '@radix-ui/react-tabs';

export const TabsItem = (props: TabsContentProps) => {
  return <RadixTabs.Content {...props} />;
};

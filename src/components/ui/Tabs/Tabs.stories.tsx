import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from '@/src/components/ui/Tabs/Tabs';
import { TabsItem } from '@/src/components/ui/Tabs/TabsItem';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'More about this component in Radix docs: https://www.radix-ui.com/primitives/docs/components/tabs.'
      }
    }
  },
  argTypes: {
    triggers: {
      description:
        "You can use different trigger types: strings, numbers, or React components. You must provide a value for each trigger to link it with its content. This value must be a unique string (non-repeating on the page). You can duplicate the trigger's text or use libraries like `uuid` or the `useId` hook with a unique string."
    },
    children: {
      description:
        "To change the content, you must use the `TabsItem` component and pass it the corresponding trigger's value. The nested components are not styled as they can be of any type. The changeable elements can be nested within other components, such as a Card component."
    },
    rootProps: {
      description: 'Props accepted by the Radix root element.'
    },
    listProps: {
      description: 'Props accepted by the Radix list element.'
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const icon = (
  <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z"
      fill="currentColor"
    />
    <path
      d="M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z"
      fill="currentColor"
    />
  </svg>
);
const stringTriggers = [
  { value: 'item1', trigger: 'Item 1' },
  { value: 'item2', trigger: 'Item 2' },
  { value: 'item3', trigger: 'Item 3' }
];

const mixedTriggers = [
  { value: 'item1', trigger: 'Item 1' },
  { value: 'item2', trigger: 2 },
  { value: 'item3', trigger: <h3>Item 3</h3> },
  { value: 'item4', trigger: <>Item 4 {icon}</> }
];

const triggersWithProps = [
  { value: 'item1', trigger: 'Item 1', className: 'item1' },
  { value: 'item2', trigger: 2, style: { color: 'red' } },
  { value: 'item3', trigger: <h3>Item 3</h3>, onClick: () => console.log('Item 3 click') }
];

const triggersDisabled = [
  { value: 'item1', trigger: 'Item 1', disabled: true },
  { value: 'item2', trigger: 'Item 2', disabled: true },
  { value: 'item3', trigger: 'Item 3', disabled: true }
];

export const WithStrings: Story = {
  args: {
    triggers: stringTriggers,
    children: (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <TabsItem value={stringTriggers[0].value}>Some text for first item</TabsItem>
          <TabsItem value={stringTriggers[1].value}>Some text for second item</TabsItem>
          <TabsItem value={stringTriggers[2].value}>Some text for third item</TabsItem>
        </div>
      </>
    )
  }
};

export const WithMixedTriggers: Story = {
  args: {
    triggers: mixedTriggers,
    children: (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <TabsItem value={mixedTriggers[0].value}>Some text for first item</TabsItem>
          <TabsItem value={mixedTriggers[1].value}>Some text for second item</TabsItem>
          <TabsItem value={mixedTriggers[2].value}>Some text for third item</TabsItem>
          <TabsItem value={mixedTriggers[3].value}>Some text for fourth item</TabsItem>
        </div>
      </>
    )
  }
};

export const WithTriggersProps: Story = {
  args: {
    triggers: triggersWithProps,
    children: (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <TabsItem value={triggersWithProps[0].value}>Some text for first item</TabsItem>
          <TabsItem value={triggersWithProps[1].value}>Some text for second item</TabsItem>
          <TabsItem value={triggersWithProps[2].value}>Some text for third item</TabsItem>
        </div>
      </>
    )
  }
};

export const Disabled: Story = {
  args: {
    triggers: triggersDisabled,
    children: (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <TabsItem value={triggersDisabled[0].value}>Some text for first item</TabsItem>
          <TabsItem value={triggersDisabled[1].value}>Some text for second item</TabsItem>
          <TabsItem value={triggersDisabled[2].value}>Some text for third item</TabsItem>
        </div>
      </>
    )
  }
};

// full example:
// =====================

// <Tabs triggers={SimpleStringTriggers}>
//   <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
//     <TabsItem value={SimpleStringTriggers[0].value}>Some text for first item</TabsItem>
//     <TabsItem value={SimpleStringTriggers[1].value}>Some text for second item</TabsItem>
//     <TabsItem value={SimpleStringTriggers[2].value}>Some text for third item</TabsItem>
//   </div>
// </Tabs>;

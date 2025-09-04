import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from '@/src/shared/ui/Tabs/Tabs';
import { TabsItem } from '@/src/shared/ui/Tabs/TabsItem';
import Icon from '@/src/shared/assets/icons/copy.svg';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Подробнее об этом компоненте в документации Radix: https://www.radix-ui.com/primitives/docs/components/tabs.'
      }
    }
  },
  argTypes: {
    triggers: {
      description:
        'Можно использовать различные типы триггеров: строки, числа или React-компоненты. Передавать массивом. Для каждого триггера необходимо указать значение, чтобы связать его с соответствующим содержимым. Это значение должно быть уникальной строкой (не повторяться на странице). Можно дублировать текст триггера или использовать библиотеки типа `uuid` или хук `useId` вместе с уникальной строкой.'
    },
    children: {
      description:
        'Как children (то есть между открывающим и закрывающим тегом компонента Tabs) можно передавать любые теги, но чтобы разместить контент, который будет меняться при клике на триггеры, нужно использовать компонент `TabsItem` и передать ему соответствующее value триггера (триггер и элемент связаны через value). Вложенные компоненты не стилизованы так как можно передать что угодно с любым количеством контейнеров и любыми стилями. Стилизованы только сами триггеры.'
    },
    rootProps: {
      description: 'Пропсы, которые принимает Radix root element.'
    },
    listProps: {
      description: 'Пропсы, которые принимает Radix list element.'
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const stringTriggers = [
  { value: 'item1', trigger: 'Item 1' },
  { value: 'item2', trigger: 'Item 2' },
  { value: 'item3', trigger: 'Item 3' }
];

const mixedTriggers = [
  { value: 'item1', trigger: 'Item 1' },
  { value: 'item2', trigger: 2 },
  { value: 'item3', trigger: <h3>Item 3</h3> },
  {
    value: 'item4',
    trigger: (
      <>
        Item 4 <Icon />
      </>
    )
  }
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

import WStep from './WStep'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WStep },
  template: `<w-step v-bind="$props"/>`,
})

export default {
  title: 'WStep',
  component: WStep,
  args: {
    id: undefined,
    classInner: undefined,
    value: 1,
    length: 3,
    items: ['都道府県選択', '市区町村選択', '医療機関選択'],
    color: '#009EDB',
    width: '290px',
  },
  argTypes: {
    id: {
      description: 'コンポーネントにDOM idを設定',
      control: {
        type: 'text',
      },
    },
    classInner: {
      description: 'コンポーネントにDOM classを設定',
      control: {
        type: 'text',
      },
    },
    value: {
      description: '現在にあるステップの値',
      control: {
        type: 'range',
        min: 1,
        max: 30,
        step: 1,
      },
    },
    length: {
      description: '総ステップ',
      control: {
        type: 'range',
        min: 1,
        max: 30,
        step: 1,
      },
    },
    items: {
      description:
        '各ステップで表示する文言<p>※lengthのindexに合わせる、空文字列("")設定可能</p>',
      control: {
        type: 'array',
      },
    },
    color: {
      description: 'コンポーネントの色を設定',
      control: {
        type: 'color',
      },
    },
    width: {
      description: 'コンポネートのwidth設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
  },
}

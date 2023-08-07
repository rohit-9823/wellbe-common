import WSwitch from './WSwitch'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WSwitch },
  template: `<w-switch v-bind="$props" />`,
})

export default {
  title: 'WSwitch',
  component: WSwitch,
  args: {
    id: undefined,
    classInner: undefined,
    title: '通院時間の通知をする',
    disabled: false,
    value: false,
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
    title: {
      description: 'タイトルの設定',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: 'スイッチを無効にする',
      control: {
        type: 'boolean',
      },
    },
    value: {
      description: 'スイッチオン：true、スイッチオフ：false',
      control: {
        type: 'boolean',
      },
    },
    color: {
      description: 'スイッチの色を設定',
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
    click: {
      description:
        'inputをクリックしたときに発生します<p>※返却値：PointerEvent</p>',
      control: false,
    },
    input: {
      description: '更新されたバウンドモデル<p>※返却値：変更後のvalue値</p>',
      control: false,
    },
  },
}

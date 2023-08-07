import WIndicator from './WIndicator.vue'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WIndicator },
  template: `<w-indicator v-bind="$props" />`,
})

export default {
  title: 'WIndicator',
  component: WIndicator,
  args: {
    id: undefined,
    classInner: undefined,
    title: '排便',
    unit: '回',
    color: '#009EDB',
    icon: false,
    value: 3,
    length: 8,
    readOnly: false,
    disabled: false,
    hintMessages: '',
    hintMessagesColor: '',
    error: false,
    errorMessages: '',
    errorMessagesColor: '#ff0000',
    required: false,
    requiredBackgroundColor: '#009EDB',
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
    unit: {
      description: '単位の設定',
      control: {
        type: 'text',
      },
    },
    color: {
      description: 'コンポーネントの色を設定',
      control: {
        type: 'color',
      },
    },
    icon: {
      description: 'アイコンを表示',
      control: {
        type: 'boolean',
      },
    },
    value: {
      description: 'レーティング値',
      control: {
        type: 'range',
        min: 1,
        max: 30,
        step: 1,
      },
    },
    length: {
      description: '表示するレーティングの数',
      control: {
        type: 'range',
        min: 1,
        max: 30,
        step: 1,
      },
    },
    readOnly: {
      description:
        '読み取り専用状態に設定。見た目は通常のままですが、入力などの操作はできません',
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      description: '入力を無効にする',
      control: {
        type: 'boolean',
      },
    },
    hintMessages: {
      description: 'ヒントを設定',
      control: {
        type: 'text',
      },
    },
    hintMessagesColor: {
      description: 'ヒントの文字色を設定',
      control: {
        type: 'color',
      },
    },
    error: {
      description: '入力を手動でエラー状態にします',
      control: {
        type: 'boolean',
      },
    },
    errorMessages: {
      description:
        'エラーメッセージを設定<p>※設定してない場合は「Error messages」が表示</p>',
      control: {
        type: 'text',
      },
    },
    errorMessagesColor: {
      description: 'エラーメッセージの文字色を設定',
      control: {
        type: 'color',
      },
    },
    required: {
      description: '必須項目にする',
      control: {
        type: 'boolean',
      },
    },
    requiredBackgroundColor: {
      description: '必須項目の背景色を設定',
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

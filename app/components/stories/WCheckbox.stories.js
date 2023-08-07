import WCheckbox from './WCheckbox'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WCheckbox },
  template: `<w-checkbox v-bind="$props"/>`,
})

export default {
  title: 'WCheckbox',
  component: WCheckbox,
  args: {
    id: undefined,
    classInner: undefined,
    title: '現在の治療法',
    disabled: false,
    items: [
      { name: '5-ASA製剤', value: 0 },
      { name: 'ステロイド', value: 0 },
    ],
    value: [
      { name: '5-ASA製剤', value: 0 },
      { name: 'ステロイド', value: 0 },
    ],
    hintMessages: '',
    hintMessagesColor: '',
    error: false,
    errorMessages: '',
    errorMessagesColor: '#ff0000',
    required: false,
    requiredBackgroundColor: '#009EDB',
    selectedButtonColor: '#009EDB',
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
      description: '全ての選択肢を無効にする',
      control: {
        type: 'boolean',
      },
    },
    items: {
      description:
        '選択肢を設定<p>※valueとnameの属性を設定してください。格式：[{value,name}]</p>',
      control: {
        type: 'array',
      },
    },
    value: {
      description: '選択された値',
      control: {
        type: 'array',
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
    selectedButtonColor: {
      description: '選択後の色を設定',
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
    change: {
      description:
        'ユーザーの操作によって値が変更されたときに発生します<p>※返却値：Event</p>',
      control: false,
    },
    click: {
      description:
        'inputをクリックしたときに発生します<p>※返却値：PointerEvent</p>',
      control: false,
    },
    input: {
      description:
        '更新されたバウンドモデル<p>※返却値：(変更後のvalue値 ,InputEvent)</p>',
      control: false,
    },
    mousedown: {
      description:
        'クリック時、押された（pressed）ときに発生します<p>※返却値：MouseEvent</p>',
      control: false,
    },
    mouseup: {
      description:
        'クリック後、放された（released）ときに発生します<p>※返却値：MouseEvent</p>',
      control: false,
    },
  },
}

import WSelect from './WSelect'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WSelect },
  template: `<w-select v-bind="$props"/>`,
})

export default {
  title: 'WSelect',
  component: WSelect,
  args: {
    id: undefined,
    classInner: undefined,
    label: '病院までの通院時間',
    disabled: false,
    items: [
      { name: '15分', value: 1 },
      { name: '30分', value: 2 },
      { name: '45分', value: 3 },
      { name: '1時間', value: 4 },
      { name: 'それ以上', value: 5 },
    ],
    value: undefined,
    placeholder: '選択してください',
    hintMessages: '',
    hintMessagesColor: '',
    error: false,
    errorMessages: '',
    errorMessagesColor: '#ff0000',
    required: false,
    requiredBackgroundColor: '#009EDB',
    color: '#009EDB',
    closeDialogOnClickOutside: true,
    height: undefined,
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
    label: {
      description: 'ラベルの設定',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: '入力を無効にする',
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
      description:
        '選択された値<p>※設定しているitemsのvalueと一致してください<br/>※プレースホルダーデがありのデフォルト値は「-1」</p>',
      control: {
        type: 'number',
      },
    },
    placeholder: {
      description:
        'プレースホルダーを設定<p>※value-1にしたら、プレースホルダーのitemがチェックされる</p>',
      control: {
        type: 'text',
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
    color: {
      description: 'コンポネートの色を設定',
      control: {
        type: 'color',
      },
    },
    closeDialogOnClickOutside: {
      description:
        'アクティブなダイアログの外側をクリックしたときにダイアログが閉じるかどうかを設定',
      control: {
        type: 'boolean',
      },
    },
    height: {
      description: 'inputのheight設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    width: {
      description: 'コンポネートのwidth設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    blur: {
      description: '入力を抜けたときに発生します<p>※返却値：FocusEvent</p>',
      control: false,
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
    focus: {
      description:
        'inputがフォーカスされている場合に発生します<p>※返却値：FocusEvent</p>',
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

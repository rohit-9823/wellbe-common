import WTextField from './WTextField'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WTextField },
  template: `<w-text-field v-bind="$props"/>`,
})

export default {
  title: 'WTextField',
  component: WTextField,
  args: {
    id: undefined,
    classInner: undefined,
    label: '姓',
    disabled: false,
    value: undefined,
    placeholder: '姓を入力してください',
    rules: [],
    hintMessages: '',
    hintMessagesColor: '',
    error: false,
    errorMessages: '',
    errorMessagesColor: '#ff0000',
    required: false,
    requiredBackgroundColor: '#009EDB',
    focusColor: '#009EDB',
    counter: 25,
    counterErrorColor: '#ff0000',
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
    value: {
      description: '入力の値',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      description: 'プレースホルダーを設定',
      control: {
        type: 'text',
      },
    },
    rules: {
      description:
        'エラールールを正規表示式で設定<p>※errorがtrueの時には無効</p>',
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
    focusColor: {
      description: 'フォーカスの色を設定',
      control: {
        type: 'color',
      },
    },
    counter: {
      description:
        '入力長のカウンタを作成<p>※バリデーションは適用しません<br/>※0と負数の場合は表示しません</p>',
      control: {
        type: 'number',
      },
    },
    counterErrorColor: {
      description:
        '入力値の長が設定されたカウンを超える場合、表示されるカウンタ文字の色を設定',
      control: {
        type: 'color',
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
        '更新されたバウンドモデル<p>※返却値：(ユーザーが入力の値 ,InputEvent)</p>',
      control: false,
    },
    keydown: {
      description:
        'キーボードの任意キーが押されたときに発生します<p>※返却値：KeyboardEvent</p>',
      control: false,
    },
    keyup: {
      description:
        'キーボードの任意キーが離されたときに発生します<p>※返却値：KeyboardEvent</p>',
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

import WAccordingSelection from './WAccordingSelection'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WAccordingSelection },
  template: `<w-according-selection v-bind="$props" />`,
})

export default {
  title: 'WAccordingSelection',
  component: WAccordingSelection,
  args: {
    id: undefined,
    classInner: undefined,
    title: '他の病院に通院していますか？',
    disabled: false,
    items: ['はい', 'いいえ'],
    value: 0,
    text: undefined,
    placeholder: 'はいの場合は、病名をご記載ください',
    rules: [],
    hintMessages: '',
    hintMessagesColor: '',
    error: false,
    errorMessages: '',
    errorMessagesColor: '#ff0000',
    required: false,
    requiredBackgroundColor: '#009EDB',
    selectedButtonColor: '#009EDB',
    focusColor: '#009EDB',
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
    title: {
      description: 'タイトルの設定',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: '全ての選択肢と入力を無効にする',
      control: {
        type: 'boolean',
      },
    },
    items: {
      description: '選択肢を設定',
      control: {
        type: 'array',
      },
    },
    value: {
      description:
        '選択された値<p>※itemのindexと同じする必要があり<br/>※選択された値が0の時のみ、テキストフィールドが入力できます</p>',
      control: {
        type: 'number',
      },
    },
    text: {
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
      description: 'エラールールを正規表示式で設定',
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
      description: '選択後とフォーカスの色を設定',
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
        '更新されたバウンドモデル<p>※返却値：(変更後のvalue値, InputEvent)<br/>※ラジオボタンのみ発生</p>',
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
    blur: {
      description:
        '入力を抜けたときに発生します<p>※返却値：FocusEvent<br/>※テキストフィールドのみ発生</p>',
      control: false,
    },
    focus: {
      description:
        'inputがフォーカスされている場合に発生します<p>※返却値：FocusEvent<br/>※テキストフィールドのみ発生</p>',
      control: false,
    },
    keydown: {
      description:
        'キーボードの任意キーが押されたときに発生します<p>※返却値：KeyboardEvent<br/>※テキストフィールドのみ発生</p>',
      control: false,
    },
    keyup: {
      description:
        'キーボードの任意キーが離されたときに発生します<p>※返却値：KeyboardEvent<br/>※テキストフィールドのみ発生</p>',
      control: false,
    },
  },
}

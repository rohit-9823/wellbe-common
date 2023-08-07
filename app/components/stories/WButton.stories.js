import WButton from './WButton'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WButton },
  template: `<w-button v-bind="$props" @onClick="_onClick"/>`,
  methods: {
    _onClick($event) {},
  },
})

export default {
  title: 'WButton',
  component: WButton,
  args: {
    id: undefined,
    classInner: undefined,
    text: 'この内容で登録する',
    textColor: '#fff',
    fontSize: undefined,
    fontWeight: undefined,
    backgroundColor: '#009EDB',
    border: false,
    borderWidth: '1px',
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: '3px',
    block: false,
    height: undefined,
    paddingTop: '0',
    paddingRight: '16px',
    paddingBottom: '0',
    paddingLeft: '16px',
    disabled: false,
    loading: false,
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
    text: {
      description: '表示する文字を設定',
      control: {
        type: 'text',
      },
    },
    textColor: {
      description: '文字色を設定',
      control: {
        type: 'color',
      },
    },
    fontSize: {
      description: '文字サイズを設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    fontWeight: {
      description: '文字の太さを設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    backgroundColor: {
      description: '背景色を設定',
      control: {
        type: 'color',
      },
    },
    border: {
      description: 'ボタン枠を設定',
      control: {
        type: 'boolean',
      },
    },
    borderWidth: {
      description:
        'ボタン枠の太さを設定（border trueの時のみ効く）<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    borderColor: {
      description: 'ボタン枠の色を設定（border trueの時のみ効く）',
      control: {
        type: 'color',
      },
    },
    borderStyle: {
      description: 'ボタン枠の形を設定（border trueの時のみ効く）',
      control: 'radio',
      options: ['dotted', 'dashed', 'solid', 'double'],
    },
    borderRadius: {
      description: 'ボタンの半径を設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    block: {
      description: 'ボタンを使用可能なスペースの最大限まで広げる',
      control: {
        type: 'boolean',
      },
    },
    height: {
      description: 'ボタンの高さを設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    paddingTop: {
      description: '要素のパディング-上を設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    paddingRight: {
      description: '要素のパディング-右を設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    paddingBottom: {
      description: '要素のパディング-下を設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    paddingLeft: {
      description: '要素のパディング-左を設定<p>※CSSの単位で設定する</p>',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: 'ボタンを無効にする',
      control: {
        type: 'boolean',
      },
    },
    loading: {
      description: 'ローディングアイコンアニメーションを追加',
      control: {
        type: 'boolean',
      },
    },
    click: {
      description:
        'inputをクリックしたときに発生します<p>※返却値：PointerEvent</p>',
      control: false,
    },
  },
}

import WSearch from './WSearch'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WSearch },
  template: `<w-search v-bind="$props"/>`,
})

export default {
  title: 'WSearch',
  component: WSearch,
  args: {
    id: undefined,
    classInner: undefined,
    disabled: false,
    value: undefined,
    placeholder: '絞り込み検索',
    backgroundColor: undefined,
    searchIconColor: undefined,
    clearIconColor: undefined,
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

    backgroundColor: {
      description: 'コンポーネントの背景色を設定',
      control: {
        type: 'color',
      },
    },
    searchIconColor: {
      description: 'サーチアイコンの色を設定',
      control: {
        type: 'color',
      },
    },
    clearIconColor: {
      description: 'クリアアイコンの色を設定',
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
    clickSearchIcon: {
      description:
        'サーチアイコンをクリックしたときに発生します<p>※返却値：PointerEvent</p>',
      control: false,
    },
    clickClearIcon: {
      description:
        'クリアアイコンをクリックしたときに発生します<p>※返却値：PointerEvent</p>',
      control: false,
    },
  },
}

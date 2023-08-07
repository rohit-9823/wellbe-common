import WDatePickerContainer from './WDatePickerContainer'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WDatePickerContainer },
  template: `<w-date-picker-container v-bind="$props" />`,
})

export default {
  title: 'WDatePickerContainer',
  component: WDatePickerContainer,
  args: {
    id: undefined,
    classInner: undefined,
    value: new Date().getTime(),
    showWeekDay: true,
    addBeforeText: undefined,
    addAfterText: undefined,
    preBtnDisabled: false,
    nextBtnDisabled: false,
    backgroundFocusColor: '#cce8f3',
    textFocusColor: '#ffffff',
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
      description:
        '日付を設定<p>※受け入れる格式：yyyy-mm-dd、timeStamp、new Date()</p>',
      control: {
        type: 'date',
      },
    },
    showWeekDay: {
      description: '曜日を表示するかどうか',
      control: {
        type: 'boolean',
      },
    },
    addBeforeText: {
      description: '日付の前に文字を入れる',
      control: {
        type: 'text',
      },
    },
    addAfterText: {
      description: '日付の後に文字を入れる',
      control: {
        type: 'text',
      },
    },
    preBtnDisabled: {
      description: '過去日ボタンを無効にする',
      control: {
        type: 'boolean',
      },
    },
    nextBtnDisabled: {
      description: '未来日ボタンを無効にする',
      control: {
        type: 'boolean',
      },
    },
    backgroundFocusColor: {
      description: 'ボタンフォーカス後の背景色を設定',
      control: {
        type: 'color',
      },
    },
    textFocusColor: {
      description: 'ボタンフォーカス後の文字色を設定',
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

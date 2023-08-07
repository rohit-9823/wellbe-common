import WRecordingCalendar from './WRecordingCalendar'

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WRecordingCalendar },
  template: `<w-recording-calendar v-bind="$props"/>`,
})

export default {
  title: 'WRecordingCalendar',
  component: WRecordingCalendar,
  args: {
    id: undefined,
    classInner: undefined,
    startDate: '2022-01-01',
    hintMessages: '',
    hintMessagesColor: '',
    stomachAche: ['data', 'data', '', 'data', '', '', 'data'],
    breakfast: ['', 'data', '', '', '', '', 'data'],
    lunch: ['data', 'data', 'data', 'data', 'data', 'data', 'data'],
    dinner: ['data', '', 'data', 'data', 'data', '', ''],
    takingMedicine: ['', '', 'data', '', 'data', 'data', ''],
    memo: ['data', 'data', '', 'data', 'data', 'data', 'data'],
    width: '450px',
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
    startDate: {
      description:
        '開始の日付を設定<p>※受け入れる格式：yyyy-mm-dd、timeStamp、new Date()<br/>※開始日付から７日間を自動的に作成</p>',
      control: {
        type: 'date',
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
    stomachAche: {
      description:
        '腹痛行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
      },
    },
    breakfast: {
      description:
        '朝食行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
      },
    },
    lunch: {
      description:
        '昼食行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
      },
    },
    dinner: {
      description:
        '夕食行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
      },
    },
    takingMedicine: {
      description:
        '服薬行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
      },
    },
    memo: {
      description:
        '日別メモ行のデータ設定<p>※Boolean オブジェクトがfalseの場合はアイコン非表示<br/>※項目7つを設定してください</p>',
      control: {
        type: 'array',
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
        '行にあるアイコンをクリックしたときに発生します<p>※返却値：({date:yyyy-mm-dd,data:各行で設定した該当項目のデータ,row:該当行の名前}, PointerEvent)</p>',
      control: false,
    },
  },
}

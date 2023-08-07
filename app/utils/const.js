// 定数
import moment from 'moment/moment'
import { CONSTANTS } from '@/utils/constants'

export const prefectures = [
  { name: '北海道', value: '1' },
  { name: '青森県', value: '2' },
  { name: '岩手県', value: '3' },
  { name: '宮城県', value: '4' },
  { name: '秋田県', value: '5' },
  { name: '山形県', value: '6' },
  { name: '福島県', value: '7' },
  { name: '茨城県', value: '8' },
  { name: '栃木県', value: '9' },
  { name: '群馬県', value: '10' },
  { name: '埼玉県', value: '11' },
  { name: '千葉県', value: '12' },
  { name: '東京都', value: '13' },
  { name: '神奈川県', value: '14' },
  { name: '新潟県', value: '15' },
  { name: '富山県', value: '16' },
  { name: '石川県', value: '17' },
  { name: '福井県', value: '18' },
  { name: '山梨県', value: '19' },
  { name: '長野県', value: '20' },
  { name: '岐阜県', value: '21' },
  { name: '静岡県', value: '22' },
  { name: '愛知県', value: '23' },
  { name: '三重県', value: '24' },
  { name: '滋賀県', value: '25' },
  { name: '京都府', value: '26' },
  { name: '大阪府', value: '27' },
  { name: '兵庫県', value: '28' },
  { name: '奈良県', value: '29' },
  { name: '和歌山県', value: '30' },
  { name: '鳥取県', value: '31' },
  { name: '島根県', value: '32' },
  { name: '岡山県', value: '33' },
  { name: '広島県', value: '34' },
  { name: '山口県', value: '35' },
  { name: '徳島県', value: '36' },
  { name: '香川県', value: '37' },
  { name: '愛媛県', value: '38' },
  { name: '高知県', value: '39' },
  { name: '福岡県', value: '40' },
  { name: '佐賀県', value: '41' },
  { name: '長崎県', value: '42' },
  { name: '熊本県', value: '43' },
  { name: '大分県', value: '44' },
  { name: '宮崎県', value: '45' },
  { name: '鹿児島県', value: '46' },
  { name: '沖縄県', value: '47' },
]
export const diseases = [
  {
    diseaseId: '1',
    name: 'クローン病',
    english: 'CD',
    methods: [
      {
        id: 1,
        order: 1,
        name: '5-ASA製剤',
        checked: false,
        column: 'is_treatment_method1',
      },
      {
        id: 2,
        order: 2,
        name: 'ステロイド',
        checked: false,
        column: 'is_treatment_method2',
      },
      {
        id: 3,
        order: 3,
        name: '免疫調節薬',
        checked: false,
        column: 'is_treatment_method3',
      },
      {
        id: 4,
        order: 4,
        name: '血球成分除去療法',
        checked: false,
        column: 'is_treatment_method4',
      },
      {
        id: 5,
        order: 5,
        name: '生物学的製剤',
        checked: false,
        column: 'is_treatment_method5',
      },
      {
        id: 6,
        order: 6,
        name: '栄養療法',
        checked: false,
        column: 'is_treatment_method6',
      },
      {
        id: 9,
        order: 7,
        name: 'インテグリン阻害薬',
        checked: false,
        column: 'is_treatment_method9',
      },
      {
        id: 7,
        order: 8,
        name: 'よくわからない',
        checked: false,
        column: 'is_treatment_method7',
      },
      {
        id: 8,
        order: 9,
        name: 'その他',
        checked: false,
        column: 'is_treatment_method8',
      },
    ],
  },
  {
    diseaseId: '2',
    name: '潰瘍性大腸炎',
    english: 'UC',
    methods: [
      {
        id: 1,
        order: 1,
        name: '5-ASA製剤',
        checked: false,
        column: 'is_treatment_method1',
      },
      {
        id: 2,
        order: 2,
        name: 'ステロイド',
        checked: false,
        column: 'is_treatment_method2',
      },
      {
        id: 3,
        order: 3,
        name: '免疫調節薬',
        checked: false,
        column: 'is_treatment_method3',
      },
      {
        id: 4,
        order: 4,
        name: '免疫抑制薬',
        checked: false,
        column: 'is_treatment_method4',
      },
      {
        id: 6,
        order: 5,
        name: '生物学的製剤',
        checked: false,
        column: 'is_treatment_method6',
      },
      {
        id: 9,
        order: 6,
        name: 'カルシニューリン阻害薬',
        checked: false,
        column: 'is_treatment_method9',
      },
      {
        id: 10,
        order: 7,
        name: 'インテグリン阻害薬',
        checked: false,
        column: 'is_treatment_method10',
      },
      {
        id: 11,
        order: 8,
        name: 'ヤヌスキナーゼ（JAK）阻害薬',
        checked: false,
        column: 'is_treatment_method11',
      },
      {
        id: 5,
        order: 9,
        name: '血球成分除去療法',
        checked: false,
        column: 'is_treatment_method5',
      },
      {
        id: 7,
        order: 10,
        name: 'よくわからない',
        checked: false,
        column: 'is_treatment_method7',
      },
      {
        id: 8,
        order: 11,
        name: 'その他',
        checked: false,
        column: 'is_treatment_method8',
      },
    ],
  },
]

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]
const weekDays = ['日', '月', '火', '水', '木', '金', '土']

export function formatDate(_dt, showWeekDay = false) {
  const dt = new Date(_dt)
  const year = dt.getFullYear()
  const month = months[dt.getMonth()]
  const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
  const weekDay = weekDays[dt.getDay()]
  if (showWeekDay) {
    return `${year}年${month}月${date}日（${weekDay}）`
  } else {
    return `${year}年${month}月${date}日`
  }
}

export function formatValidateDate(_dt) {
  if (!_dt) return ''
  try {
    const dt = new Date(_dt)
    return formatDateToYmd(dt)
  } catch {
    return ''
  }
}

export function formatDateTime(_dt) {
  if (!_dt) return ''
  try {
    const dt = moment(_dt, CONSTANTS.DYNAMIC_DATE_TIME_LOCAL_FORMAT).format(
      CONSTANTS.DYNAMIC_DATE_TIME_LOCAL_FORMAT
    )
    return dt
  } catch {
    return ''
  }
}

export function formatDateToYmd(_dt) {
  const year = _dt.getFullYear()
  const month = months[_dt.getMonth()]
  const date = _dt.getDate() < 10 ? '0' + _dt.getDate() : _dt.getDate()
  return `${year}-${month}-${date}`
}

export function createCalendarHeaderDate(dt, totalDays) {
  let baseDate = new Date()
  if (dt) baseDate = dt
  const result = []
  for (let i = 0; i <= totalDays; i++) {
    const newDate = new Date(new Date(baseDate).getTime() + 86400000 * i)
    const year = newDate.getFullYear()
    const month = months[newDate.getMonth()]
    const date =
      newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    const weekDay = weekDays[newDate.getDay()]
    result.push({ year, month, date, weekDay })
  }
  return result
}

export function colorRgba(sColor, opacity) {
  sColor = sColor.toLowerCase()
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return `rgba(${sColorChange.join(',')},${opacity})`
  }
  return sColor
}

import moment from 'moment'
import { CONSTANTS } from '@/utils/constants'

export const validations = {
  addCounterValidation(validations) {
    if (validations) {
      try {
        const data = validations.filter((v) => v.label === 'string_length')
        if (data.length === 1) {
          return parseInt(data[0].extra_data.max)
        }
      } catch (error) {
        console.error('Error finding Counter:', error)
      }
    }
  },
  validateDigitDecimalCountXnY(value, validation) {
    const mapVariables = [
      validation.extra_data.before_decimal,
      validation.extra_data.after_decimal,
    ]
    const newMapVariable = mapVariables.map((str) => Number(str))
    const newPattern = `^(\\d{${newMapVariable[0]}})(\\.\\d{${newMapVariable[1]}})?$`
    const nReg = new RegExp(newPattern)
    const error = value ? !nReg.test(value) : false
    const msg = validation.message
    const errorMessage = msg.replace(/\{\$(\d+)\}/g, (_, n) => mapVariables[n])
    return {
      error,
      errorMessage,
    }
  },

  validateRequired() {
    const errorMessage = `This field is required`
    const error = true

    return {
      error,
      errorMessage,
    }
  },

  validateStringLength(obj, value) {
    const error =
      value?.length > obj.extra_data.max || value?.length < obj.extra_data.min
    const msg = obj.message
    const mapVariables = [obj.extra_data.min, obj.extra_data.max]
    const errorMessage = msg.replace(/\{\$(\d+)\}/g, (_, n) => mapVariables[n])

    return {
      error,
      errorMessage,
    }
  },

  validateDigitCountUptoX(obj, value) {
    const error = value ? value.toString().length > obj.extra_data.x : false
    const msg = obj.message
    const mapVariables = [obj.extra_data.x]
    const errorMessage = msg.replace(/\{\$(\d+)\}/g, (_, n) => mapVariables[n])
    return {
      error,
      errorMessage,
    }
  },

  validateIfOldDateSelected(obj, value) {
    const error = value
      ? moment(value).startOf('day').isBefore(moment().startOf('day'), 'day')
      : false
    const errorMessage = obj.message

    return {
      error,
      errorMessage,
    }
  },

  validateNumberOnly(obj, value) {
    const expression = obj.condition
    const re = new RegExp('\\b' + expression + '\\b')
    const error = value ? !re.test(value) : false
    const errorMessage = obj.message
    return {
      error,
      errorMessage,
    }
  },
  validateDecimalOnly(obj, value, obj2) {
    const expression = obj.condition
    const re = new RegExp('\\b' + expression + '\\b')
    const error = value ? !re.test(value) : false
    const errorMessage = obj.message
    return {
      error,
      errorMessage,
    }
  },
  validateSpecialComponentCount(obj, value) {
    const error = !(value >= 0 && value <= Number(obj.condition))
    const msg = obj.message
    const mapVariables = [obj.condition]
    const errorMessage = msg.replace(/\{\$(\d+)\}/g, (_, n) => mapVariables[n])

    return {
      error,
      errorMessage,
    }
  },

  validateSpecialComponentCountOverOne(obj, value) {
    const error = !value
    const msg = obj.message
    const mapVariables = [obj.condition]
    const errorMessage = msg.replace(/\{\$(\d+)\}/g, (_, n) => mapVariables[n])

    return {
      error,
      errorMessage,
    }
  },

  isObjectEmpty(obj) {
    return Object.keys(obj).length > 0
  },

  matchesIdWithString(id, toMatchString) {
    const regex = /([^\d]+)/g
    const found = id.match(regex)
    if (id.match(regex).length === 0) return false
    return found[0] === toMatchString
  },

  getStringWithoutNumberFromComponentId(id) {
    const regex = /([^\d]+)/g

    const found = id.match(regex)
    if (id.match(regex).length === 0) return ''
    return found[0]
  },
  getNumberWithoutStringFromComponentId(id) {
    const regex = /(\d+)/g

    const found = id.match(regex)
    if (id.match(regex).length === 0) return ''

    return found[0]
  },
  getFormat(id) {
    const idString = this.getStringWithoutNumberFromComponentId(id)
    let formatType = CONSTANTS.STRING
    switch (idString) {
      case CONSTANTS.BIRTHDAY_LABEL_STRING:
        formatType = CONSTANTS.DATE_FORMAT
        break
    }
    return formatType
  },

  isValueEmpty(val) {
    return CONSTANTS.IS_EMPTY_VALUE.includes(val)
  },
  validateIfAfterDateSelected(obj, value) {
    const error = value
      ? moment(value).startOf('day').isAfter(moment().startOf('day'), 'day')
      : false
    const errorMessage = obj.message

    return {
      error,
      errorMessage,
    }
  },
}

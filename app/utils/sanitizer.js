import { CONSTANTS } from '@/utils/constants'
export const sanitizer = {
  validateValue(value, conversionType, componentName) {
    // if(value == null) return value;
    let v = null
    switch (conversionType) {
      case CONSTANTS.INTEGER:
        if (componentName === CONSTANTS.RADIO_GROUP_COMPONENT_NAME) {
          v = value ? parseInt(value) : null
        } else v = value ? parseInt(value) : 0
        break
      case CONSTANTS.STRING:
        if (value === 0) v = String(value)
        else v = value ? String(value) : ''
        break
      case CONSTANTS.BOOLEAN:
        v = !value
        break
      case CONSTANTS.ARRAY:
        v = this.convertToArray(value)
        break

      case CONSTANTS.FLOAT:
        v = parseFloat(value)
        break

      case CONSTANTS.ARRAY_OF_STRING:
        v = value || []
        break

      default:
        if (componentName === CONSTANTS.TIME_PICKER_COMPONENT_NAME)
          v = value ? String(value) : null
        else if (value === 0) v = String(value)
        else v = value ? String(value) : ''
        break
    }

    return v
  },

  defaultRadioButtonValue(answers, value) {
    if (!answers.includes(JSON.stringify(value))) {
      return null
    }
    return value
  },

  convertToArray(value) {
    try {
      if (Array.isArray(value)) {
        return value
      }
      return value.split(',')
    } catch (e) {
      return []
    }
  },

  validateStyleValue(key, value) {
    let v = null
    switch (key) {
      case CONSTANTS.BOLD:
        v = value ? CONSTANTS.BOLD : CONSTANTS.NORMAL
        break
      case CONSTANTS.ROWS:
        v = value ? parseInt(value) : 1
        break
    }

    return v
  },

  mapComponentValue(value, component) {
    try {
      const vType = componentMapper.find(
        (c) => c.component === component
      ).value_type

      return this.validateValue(value, vType)
    } catch (e) {
      console.log('Component undefined in componentMapper: ', component)
      return String(value)
    }
  },

  mapStyleValueWithState(name) {
    return styleMapperWithState.includes(name)
  },

  mapStyleValue(key, value) {
    return this.validateStyleValue(key, value)
  },
}

export const componentMapper = [
  {
    component: CONSTANTS.SELECT_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.INDICATOR_COMPONENT_NAME,
    value_type: CONSTANTS.INTEGER,
  },
  {
    component: CONSTANTS.SWITCH_COMPONENT_NAME,
    value_type: CONSTANTS.BOOLEAN,
  },
  {
    component: CONSTANTS.CHECKBOX_GROUP_COMPONENT_NAME,
    value_type: CONSTANTS.ARRAY,
  },
  {
    component: CONSTANTS.TEXT_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.RADIO_GROUP_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.DATE_PICKER_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.LABEL_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.BUTTON_NEXT_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.BUTTON_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.CHECKBOX_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.TEXT_AREA_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.NATIVE_LINK_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.REDIRECT_LINK_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.RADIO_ICON_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.SELECT_RANGE_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.BUTTON_LINK_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.TIME_PICKER_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.NUMBER_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.HIDDEN_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.DATE_TIME_LOCAL_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.BUTTON_PREV_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
  {
    component: CONSTANTS.BUTTON_CONFIRMATION_COMPONENT_NAME,
    value_type: CONSTANTS.STRING,
  },
]

export const styleMapperWithState = [
  CONSTANTS.FONT_SIZE,
  CONSTANTS.FONT_COLOR,
  CONSTANTS.BACKGROUND_COLOR,
  CONSTANTS.ERROR_HIGHLIGHT,
  CONSTANTS.INDICATOR_COLOR,
  CONSTANTS.INDICATOR_POINTER_COLOR,
  CONSTANTS.CHECK_COLOR,
  CONSTANTS.BORDER_COLOR,
  CONSTANTS.UNCHECKED_COLOR,
]

export const styleMapper = [
  { key: CONSTANTS.BOLD, value_type: CONSTANTS.STRING },
  { key: CONSTANTS.ROWS, value_type: CONSTANTS.INTEGER },
]

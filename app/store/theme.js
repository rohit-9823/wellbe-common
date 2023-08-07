import { CONSTANTS } from '@/utils/constants'
export const state = () => ({
  default: {
    colorPalette1: '#009EDB', // default : mainColor
    colorPalette2: '#009EDB', // default : subColor
    colorPalette3: '#009EDB',
    colorPalette4: '#009EDB',
    colorPalette5: '#009EDB',
    colorPalette6: '#009EDB',
    colorPalette7: '#009EDB',
    colorPalette8: '#009EDB',
    colorPalette9: '#009EDB',
    colorPalette10: '#009EDB',
    fontSizeBig: 24,
    fontSizeMiddle: 16,
    fontSizeSmall: 12,
  },
  application: {},
  currentPage: 1,
  xWLBHeader: {},
  partsBodyList: [],
  profileEditSpecialComponentList: [],
})

export const getters = {
  /**
   * Get main color code
   *
   * @param {*} state
   * @param {*} color Color code specified on the component side
   * @param {*} defaultColor Application-defined default color code
   * @returns
   */
  getAttributeValue(state) {
    return function (val) {
      if (state.application[val]) return state.application[val]

      if (val) {
        return val
      }

      return state.default.colorPalette1
    }
  },

  /**
   * get sub color code
   *
   * @param {*} state
   * @param {*} color Color code specified on the component side
   * @param {*} defaultColor Application-defined default color code
   * @returns
   */
  getSubColor(state) {
    return function (color) {
      if (state.application[color]) return state.application[color]

      if (color) {
        return color
      }

      return state.default.colorPalette2
    }
  },

  /**
   * get border color code
   *
   * @param {*} state
   * @param {*} color Color code specified on the component side
   * @param {*} defaultColor Application-defined default color code
   * @returns
   */
  getColorValue(state) {
    return function (color) {
      if (state.application[color]) return state.application[color]
      if (color) {
        return color
      }
      // TODO: default colorpalette input --> bikash saan
      return state.default.colorPalette3
    }
  },

  getCurrentPageIndex(state) {
    return state.currentPage
  },

  getXWLBHeader(state) {
    return state.xWLBHeader
  },

  getPartValueById: (state) => (id, returnType) => {
    const partObj = state.partsBodyList.filter((p) => p.id === id)
    if (partObj.length > 0) {
      if (returnType === CONSTANTS.STRING)
        return partObj[0].value ? String(partObj[0].value) : '0'

      return Number(partObj[0].value)
    }
  },

  getPartLabelById: (state) => (id) => {
    const partObj = state.partsBodyList.filter((p) => p.id === id)
    if (partObj.length > 0) {
      return partObj[0]?.label
    }
  },

  getProfileEditComponentValueById: (state) => (id) => {
    const profileEditObj = state.profileEditSpecialComponentList.find(
      (p) => p.id === id
    )
    if (profileEditObj) {
      return profileEditObj.value === null ? 0 : profileEditObj.value
    }

    return 0
  },

  getErrorIfNoneCheckBoxSelectedForProfileEdit(state) {
    const found = state.profileEditSpecialComponentList.filter(
      (p) =>
        p.type === CONSTANTS.CHECKBOX_COMPONENT_NAME &&
        (p.value === 1 || p.value === '1')
    )

    if (found.length > 0) return false

    return true
  },
}

// contains your actions
export const actions = {
  updateApplication({ state, commit }, payload) {
    commit('setApplication', payload)
  },

  incrementPageIndex({ state, commit }) {
    commit('incrementPageIndex')
  },

  decrementPageIndex({ state, commit }) {
    commit('decrementPageIndex')
  },

  incrementPageIndexBySpecificNumber({ state, commit }, number) {
    commit('incrementPageIndexBySpecificNumber', number)
  },

  setXWLBHeader({ state, commit }, payload) {
    commit('setXWLBHeader', payload)
  },

  setPartBodyList({ state, commit }, payload) {
    commit('setPartBodyList', payload)
  },

  updatePartValueById({ state, commit }, payload) {
    commit('updatePartValueById', payload)
  },

  clearAllPartsComponentValue({ state, commit }) {
    commit('clearAllPartsComponentValue')
  },

  setProfileEditSpecialComponentToState({ state, commit }, payload) {
    commit('setProfileEditSpecialComponentToState', payload)
  },

  updateProfileEditSpecialComponentValue({ state, commit }, payload) {
    commit('updateProfileEditSpecialComponentValue', payload)
  },

  clearAllProfileEditSpecialComponentValue({ state, commit }) {
    commit('clearAllProfileEditSpecialComponentValue')
  },
}

// contains your mutations
export const mutations = {
  setApplication(state, payload) {
    state.application = payload
  },

  setXWLBHeader(state, payload) {
    state.xWLBHeader = payload
  },

  setPartBodyList(state, payload) {
    state.partsBodyList = payload
  },

  incrementPageIndex(state) {
    state.currentPage++
  },

  decrementPageIndex(state) {
    if (state.currentPage > 1) state.currentPage--
  },

  incrementPageIndexBySpecificNumber(state, number) {
    state.currentPage += number
  },

  updatePartValueById(state, payload) {
    state.partsBodyList.map((c) => {
      if (c.id === payload.id) {
        c.value = payload.value
      }
      return c
    })
  },

  clearAllPartsComponentValue(state) {
    state.partsBodyList.map((c) => {
      c.value = 0
      return c
    })
  },

  setProfileEditSpecialComponentToState(state, payload) {
    const profileEditSpecialComponent =
      state.profileEditSpecialComponentList.filter((p) => p.id === payload.id)

    if (profileEditSpecialComponent.length === 0) {
      state.profileEditSpecialComponentList.push(payload)
    }
  },

  updateProfileEditSpecialComponentValue(state, payload) {
    state.profileEditSpecialComponentList.map((c) => {
      if (c.id === payload.id) {
        c.value = payload.value
      }
      return c
    })
  },

  clearAllProfileEditSpecialComponentValue(state) {
    state.profileEditSpecialComponentList.map((c) => {
      c.value = 0
      return c
    })
  },
}

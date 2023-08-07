import { CONSTANTS } from '@/utils/constants'

export const state = () => ({
  componentErrors: [],
  isSubmitted: false,
})

export const getters = {
  getErrorStateById: (state) => (id) => {
    return state.componentErrors.filter((errObj) => errObj.id === id).length > 0
  },

  getErrorMessageById: (state) => (id) => {
    const errorList = state.componentErrors.filter(
      (errObj) => errObj.id === id && errObj.error_status === true
    )

    if (errorList.length > 0) {
      try {
        return errorList.find(
          (errObj) =>
            errObj.error_type === CONSTANTS.REQUIRED ||
            CONSTANTS.VALIDATION_NUMBER_ONLY ||
            CONSTANTS.VALIDATION_STRING_LENGTH
        ).error_message
      } catch (e) {
        return errorList[0].error_message
      }
    }
  },

  getErrorForComponentById: (state) => (id) => {
    const errorList = state.componentErrors.filter(
      (errObj) => errObj.id === id && errObj.error_status === true
    )
    return state.isSubmitted && errorList.length > 0
  },

  getIfIsSubmitted(state) {
    return state.isSubmitted
  },

  getIfAnyError: (state) => {
    return (
      state.componentErrors.filter((errObj) => errObj.error_status === true)
        .length === 0
    )
  },
}

// contains your actions
export const actions = {
  updateErrorsForComponent({ state, commit }, payload) {
    commit('setErrorsForComponent', payload)
  },

  updateSubmitRequested({ state, commit }) {
    commit('setSubmitRequested')
  },

  setSubmitRequestToFalse({ state, commit }) {
    commit('setSubmitRequestToFalse')
  },

  updateErrorStateForComponentById({ state, commit }, payload) {
    commit('updateErrorsForComponentById', payload)
  },
}

// contains your mutations
export const mutations = {
  setErrorsForComponent(state, payload) {
    if (
      state.componentErrors.find(
        (c) => c.id === payload.id && c.error_type === payload.error_type
      )
    ) {
      state.componentErrors.map((c) => {
        if (c.id === payload.id && c.error_type === payload.error_type) {
          c.error_status = payload.error_status
        }
        return c
      })
    } else {
      state.componentErrors.push(payload)
    }
  },

  setSubmitRequested(state) {
    state.isSubmitted = true
  },

  setSubmitRequestToFalse(state) {
    state.isSubmitted = false
  },

  updateErrorsForComponentById(state, payload) {
    state.componentErrors.map((c) => {
      if (c.id === payload.id && c.error_type === payload.error_type) {
        c.error_status = payload.error_status
      }
      return c
    })
  },
}

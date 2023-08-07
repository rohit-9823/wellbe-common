export const state = () => ({
  componentList: [],
})

export const getters = {
  getAllComponentListValue(state) {
    return state.componentList
  },
}

export const actions = {
  setIdInComponentList({ state, commit }, payload) {
    commit('setIdInComponentList', payload)
  },

  updateCheckboxIconListValueById({ state, commit }, payload) {
    commit('updateCheckboxIconListValueById', payload)
  },
}

export const mutations = {
  setIdInComponentList(state, payload) {
    state.componentList.push(payload)
  },

  updateCheckboxIconListValueById(state, payload) {
    state.componentList.map((c) => {
      if (c.part_id === payload.part_id) {
        c.part_value = payload.part_value
      }
      return c
    })
  },
}

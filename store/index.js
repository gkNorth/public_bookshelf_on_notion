import axios from 'axios'

export const state = () => ({
  items: [],
  isEdit: false
});

export const getters = {
  getPageDetail: (state) => (id) => {
    return state.items.filter(item => item.id === id)
  }
}

export const mutations = {
  getListFromAction (state, list) {
    state.items = list
  },
  switchEditModeMutation (state) {
    state.isEdit = !state.isEdit
  }
};

export const actions = {
  async getListFromApi ({commit}) {
    const url = `${process.env.baseUrl}/api`
    axios.get(url)
      .then(res=>{ 
        commit("getListFromAction", res.data)
      })
  },
  async updatePageParams ({commit}, {bookUrl, bookTitle, bookPurpose, bookEssence, bookActionPlan, id}) {
    const data = {bookUrl, bookTitle, bookPurpose, bookEssence, bookActionPlan, id}
    const url =  `${process.env.baseUrl}/api/${id}`
    axios.put(url,{params:data})
  },
  switchEditModeAction ({commit}) {
    commit("switchEditModeMutation")
  }
}
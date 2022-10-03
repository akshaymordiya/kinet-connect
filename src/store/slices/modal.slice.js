import { createSlice } from "@reduxjs/toolkit";

const initialState =  {};

const replica = {
  key: null,
  active: false,
  data: {},
  actions: {}
}

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers :{
    createModal: (state, { payload: { key } }) => ({
      ...state,
      [key]: {
        ...replica,
        key
      }
    }),
    updateModalData: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: {
        ...state[key],
        data: value
      }
    }),
    updateModalStatus: (state, { payload : { key, isActive }}) => ({ 
      ...state,
      [key]: {
        ...state[key],
        active: isActive 
      }
    }),
    addAction: (state, { payload: { key, actionName, actionHandler }}) => ({
      ...state,
      [key]: {
        ...state[key],
        actions: { 
          ...state[key].actions,
          [actionName]: actionHandler
        }
      }
    }),
    deleteAction: (state, { payload : { key, actionName }}) => {
      delete state[key].actions[actionName]
    },
    clearActions: (state, { payload: { key }}) => ({
      ...state,
      [key]: {
        ...state[key],
        actions: {}
      }
    }),
    deleteModal: (state, { payload: { key }}) => {
      delete state[key]
    }
  }
})

export const {
  createModal,
  deleteModal,
  updateModalData,
  updateModalStatus,
  addAction,
  deleteAction,
  clearActions,
} = modalsSlice.actions

export default modalsSlice.reducer
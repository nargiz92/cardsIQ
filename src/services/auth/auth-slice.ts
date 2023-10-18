import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  name: '',
  nickForChange: '',
  password: '',
  user: {},
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setUpdatedName: (state, action) => {
      state.nickForChange = action.payload
    },
  },
})

export const { setName, setUpdatedName } = authSlice.actions

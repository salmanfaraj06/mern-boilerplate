import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentUser: null,
  loading: false,
  error: {},
  success: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      const { field, message } = action.payload;
      state.error[field] = message;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearStatus: (state) => {
      state.error = {};
      state.success = '';
    },
    logout: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = {};
        state.success = '';
      },
  },
});

export const { setUser, setLoading, setError, setSuccess, clearStatus,logout } = userSlice.actions;

export default userSlice.reducer;

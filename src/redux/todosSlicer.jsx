import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "./services";

export const listActivity = createAsyncThunk(
  "listActivity",
  async (params, { rejectWithValue }) => {
    try {
      const response =
        await services.getList(/* params.IdUser, params.document */);
      console.log(response, "ini responsenya");
      return response;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const createData = createAsyncThunk(
  "activity-groups",
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const { title, email, _comment } = getState().todosSlicer.postActivity;

      const payload = {
        title,
        email,
        _comment,
      };
      const response = await services.postData(payload);
      if (response.status === 201) {
        dispatch(listActivity());
      }

      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteData = createAsyncThunk(
  "activity-groups/:id?",
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await services.deleteActivity(params.id);
      if (response.status === 200) {
        dispatch(listActivity());
      }
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  activity: [],
  postActivity: {
    title: "New Activity",
    email: "rhobbie09@gmail.com",
    _comment:
      "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
  },
};

const todosSlicer = createSlice({
  name: "todosSlicer",
  initialState: {
    ...initialState,
  },
  reducers: {
    setActivity: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setDataActivity: (state, action) => {
      state.postActivity[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listActivity.fulfilled, (state, action) => {
      console.log(action.payload.data.data);
      if (action.payload !== undefined) {
        state.activity = action.payload.data.data;
      }
    });
  },
});

export const { setActivity, setDataActivity } = todosSlicer.actions;

export default todosSlicer.reducer;

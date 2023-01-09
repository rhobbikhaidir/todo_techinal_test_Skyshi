import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { swal } from "../helper/swal";
import services from "./services";

export const listActivity = createAsyncThunk(
  "listActivity",
  async (params, { rejectWithValue }) => {
    try {
      const response =
        await services.getList();
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
  "deleteData",
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

export const getDetail = createAsyncThunk(
  "getDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await services.getDetail(id);
      // console.log(response, "ini responsenya getDetail");
      return response;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const postDetail = createAsyncThunk(
  "activity_groups",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const { priority, title } =
      getState().todosSlicer.post_detail;
    const { id_detail } = getState().todosSlicer;
    try {
      const payload = {
        title,
        activity_group_id: id_detail.toString(),
        priority,
      };
      const response = await services.postDetail(payload);
      if (response.status === 201) {
        dispatch(getDetail(id_detail));
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

export const putDetail = createAsyncThunk(
  "putDetail",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const { is_active, priority, title } = getState().todosSlicer.put_detail;
    const { id_detail } = getState().todosSlicer;
    try {
      const payload = {
        title,
        priority,
        is_active,
      };
      const response = await services.putDetail(id, payload);
      console.log(response, '****REsponse  update')
      if (response.status === 200) {
        dispatch(getDetail(id_detail));
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

export const updateTitle = createAsyncThunk(
  "updateTitle",
  async (id, { rejectWithValue, dispatch, getState }) => {
    // const { is_active, priority, title } = getState().todosSlicer.put_detail;
    const { title_detail } = getState().todosSlicer;
    try {
      const payload = {
        title_detail,
      };
      const response = await services.updateTitle(id, payload);
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

export const DeleteDetail = createAsyncThunk(
  "DeleteDetail",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const { id_detail } = getState().todosSlicer;

    try {
      const response = await services.deleteDetail(id);
      console.log(response, 'ini response delte')
      if (response.status === 200) {
        dispatch(getDetail(id_detail));
        swal.success("berhasil mengahpus data");
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
  redirect: false,
  id_detail: "",
  title_detail: "",
  list_detail: [],
  post_detail: {
    activity_group_id: "",
    priority: "",
    title: "",
  },
  put_detail: {
    is_active: 1,
    priority: "",
    title: "",
  },
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
    setRedirect: (state, action) => {
      state.redirect = action.payload
    },
    setActivity: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setDataActivity: (state, action) => {
      state.postActivity[action.payload.key] = action.payload.value;
    },
    setPostDetail: (state, action) => {
      state.post_detail[action.payload.key] = action.payload.value;
    },
    setPutDetail: (state, action) => {
      state.put_detail[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listActivity.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.activity = action.payload.data.data;
      }
    });
    builder.addCase(getDetail.fulfilled, (state, action) => {
        // console.log(action.payload.data.todo_items, 'balikan bealign-self-center');
        state.list_detail = action.payload.data.todo_items;
    });
    builder.addCase(updateTitle.fulfilled, (state, action) => {
        // console.log(action.payload.data.todo_items, 'balikan bealign-self-center');
        // state.list_detail = action.payload.data.todo_items;
    });
  },
});

export const { setActivity, setDataActivity, setPostDetail, setPutDetail, setRedirect } =
  todosSlicer.actions;

export default todosSlicer.reducer;

import axios from "axios";

const api = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id/",
});

const services = {
  getList: async () => {
    try {
      const response = await api.get(`activity-groups`, {
        params: {
          email: "rhobbie09@gmail.com",
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  },
  postData: async (data) => {
    try {
      const response = await api.post("activity-groups", data);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`activity-groups/${id}`);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  updateTitle: async (id, data) => {
    try {
      const response = await api.patch(`activity-groups/${id}`, data);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },

  getDetail: async (id) => {
    try {
      const response = await api.get(`activity-groups/${id}`);
      return response;
    } catch (err) {
      return err;
    }
  },

  postDetail: async (data) => {
    try {
      const response = await api.post("todo-items", data);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  deleteDetail: async (id) => {
    try {
      const response = await api.delete(`todo-items/${id}`);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  putDetail: async (id, data) => {
    try {
      const response = await api.patch(`todo-items/${id}`, data);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default services;

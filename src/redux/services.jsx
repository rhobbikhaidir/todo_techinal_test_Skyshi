import axios from "axios";

const api = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id/",
});

const services = {
  getList: async (idUser, document) => {
    try {
      const response = await api.get(
        `activity-groups?email=rhobbie09@gmail.com` /* , {
                params: {
                    idUser,
                    document
                } */
        // }
      );
      return response;
    } catch (err) {
      return err;
    }
  },


  getDetail: async (id) => {
    try {
      const response = await api.get(
        `activity-groups/${id}` 
      );
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
      const response = await api.delete(`activity-groups/:id?id=${id}`);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
};

export default services;

import axios from "axios";

const USER_API_URL = "http://localhost:5000/users";

class UserService {
  getUsers() {
    return axios.get(USER_API_URL);
  }

  getUserById(userId) {
    return axios.get(USER_API_URL + "/get/" + userId);
  }

  createUser(user) {
    return axios.post(USER_API_URL, user);
  }

  updateUser(user, userId) {
    return axios.put(USER_API_URL + "/update/" + userId, user);
  }

  deleteUser(userId) {
    return axios.delete(USER_API_URL + "/delete/" + userId);
  }
}

export default new UserService();

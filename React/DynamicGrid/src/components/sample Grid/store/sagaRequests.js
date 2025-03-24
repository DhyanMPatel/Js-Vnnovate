import Axios from "../../../services/api";

export const fetchUsers = () => Axios.get('/users');

export const fetchSingleUser = (id) => Axios.get(`/users/${id}`)
import {
  getAppointmentList,
  setArrival,
  editAppointment,
  getAllGoodsList
} from '@@/api/appointment'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const appointment = {
  state: {

  },

  mutations: {

  },

  actions: {
    // 获取预约列表信息
    GetAppointmentList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getAppointmentList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 预约到店操作
    SetArrival({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        setArrival(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 编辑预约信息
    EditAppointment({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        editAppointment(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    },
    // 编辑预约信息
    GetAllGoodsList({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getAllGoodsList(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
      })
    }
  }
}

export default appointment

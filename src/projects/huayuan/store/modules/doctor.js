import {
  getDoctorLists,
  addEditDoctor,
  deleteDoctor
} from '@@/api/doctor'
import { getToken, setToken, removeToken } from '@@/utils/auth'

const system = {
  state: {

  },

  actions: {
    // 获取医生列表
    GetDoctorLists({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        getDoctorLists(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 添加/编辑医生
    AddEditDoctor({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        addEditDoctor(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    },
    // 删除医生
    DeleteDoctor({ commit }, data = {}) {
      if(data.token){
        data.token = getToken();
      }
      return new Promise((resolve, reject) => {
        deleteDoctor(data).then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err)
        });
      })
    }
  }
}

export default system

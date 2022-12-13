import { login } from '@/api/login';
import { userDetail } from "@/api/user"
import { getToken, setToken } from '@/utils/auth'



const user = {
    state: {
        token: getToken(),
        phone: null,
        password: null,
        uid: 345288322,
        nickname: null,
        avatarUrl: '',

    },
    mutations: {
        // token
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        // 用户名字
        SET_NAME: (state, name) => {
            state.nickname = name
        },
        // 头像avatarUrl
        SET_AVATAR: (state, avatar) => {
            state.avatarUrl = avatar
        }
    },
    actions: {
        // 登录
        Login({ commit }, accountInfo) {
            const phone = accountInfo.phone;
            const password = accountInfo.password;
            return new Promise((resolve, reject) => {
                login(phone, password).then((res) => {
                    console.log(res)
                    this.id = res.profile.userId;
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        // 获取用户信息
        getUserInfo({ commit }) {
            const userId = this.state.user.uid
            console.log(this.state.user.uid)
            return new Promise((resolve, reject) => {
                userDetail(userId).then((res) => {
                    console.log(res)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        }
    }
}
export default user
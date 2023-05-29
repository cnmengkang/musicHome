import { cloudsearch } from '@/api/search/search';
import { loginStatus } from '@/api/user/user'
export default {
    // 获取当前播放的音乐
    getCurrentMusicIsPlay({ state }, data) {
        state.player.createAudio(data);
        console.log('new Audio success', state.player)
    },
    drawerOpen({ state }) {
        return state.player.drawer = !state.player.drawer;
    },
    async getCloudSearch({ commit }, data) {
        commit('SEARCH_TITLE', data.keywords)
        const { result } = await cloudsearch(data);
        commit('SONG_COUNT', result.songCount);
        commit('SEARCH_LIST', result.songs);
    },
    // 获取登录状态
    getLoginStatus({ commit }) {
        return new Promise((resolve, reject) => {
            loginStatus().then(res => {
                const result = res.data;
                if (result.account.status != 0) return;
                commit('USER_NAME', result.profile.nickname)
                commit('USER_AVATAR', result.profile.avatarUrl)
                commit('USER_UID', result.profile.userId)
            })
        })
    },
}
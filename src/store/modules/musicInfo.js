import { songUrl, songDetail, lyric } from '@/api/music/music';
const musicInfo = {
    state: {
        // 单曲音乐信息
        musicUrl: '', //音乐url
        level: 'exhigh', //音乐音质
        musicMd5: '', //音乐加密
        musicType: '', //音乐类型
        musicTime: '',//音乐总时长
        // 底部展示信息
        name: '', //作者名
        avatar: '', //作者头像
        title: '', //歌名
        alia: '',
        id: '',//当前音乐id
        // 控制底部显示隐藏
        footerShow: false,
        lyric: []
    },
    mutations: {
        // 存储当前单曲信息
        SINGLE_DETAIL(state, single) {
            console.log(single)
            state.title = single.name
            state.avatar = single.al.picUrl
            state.alia = single.alia
            state.name = single.ar
            state.id = single.id
        },
        // 存储播放音乐的url信息
        MUSIC_URL: (state, musicUrl) => {
            state.musicUrl = musicUrl.url
            state.musicType = musicUrl.encodeType
            state.musicMd5 = musicUrl.md5
            state.id = musicUrl.id
            state.musicTime = musicUrl.time
        },
        // 底部显示隐藏
        FOOTER_SHOW: (state, show) => {
            state.footerShow = show
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric
        }
    },
    actions: {
        // 获取当前音乐的详细信息，并存储到state里面,供底部使用数据
        async getCurrentMusicDetail({ dispatch, commit }, ids) {
            if (!ids) return;
            commit('FOOTER_SHOW', true)
            const detail = await songDetail(ids);
            console.log(detail)
            const songs = detail.songs[0];
            const privileges = detail.privileges
            dispatch('getCurrentMusicUrl', ids)    //调用音乐url
            dispatch('getCurrentMusicLyric', ids)
            commit('SINGLE_DETAIL', songs)
        },
        // 获取当前音乐的播放地址并存储到state里面。
        async getCurrentMusicUrl({ state, commit }, id) {
            const params = { id: id, level: state.level }
            const res = await songUrl(params);
            console.log(res)
            commit('MUSIC_URL', res.data[0])
        },
        // // 获取当前音乐的歌词
        getCurrentMusicLyric({ commit }, id) {
            return new Promise((resolve, reject) => {
                lyric(id).then(res => {
                    commit('SET_LYRIC', res.lrc.lyric);
                    resolve()
                })
            })
        }
    }
}
export default musicInfo
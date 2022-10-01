import { defineStore } from 'pinia';
import { klona } from 'klona';
import setList from '@/utils/notice';
export const useAppStore = defineStore('app', {
    state: () => {
        return {
            currentWeek: 0,
            primaryColor: 'fuchsia',
            todayCourse: [],
            tomorrowCourse: [],
            lang: 'zh-CN',
            // 通知队列
            messageList: [],
            // 上课通知提前时间，单位：分钟
            startNoticeTime: 0,
            // 下课通知提前时间，单位：分钟
            endNoticeTime: 0
        };
    },
    actions: {
        // 设置当前周次
        setCurrentWeek(week) {
            this.currentWeek = week;
        },
        setMessageList(val) {
            this.messageList = klona(val);
            setList();
        }
    },
    getters: {
        getMessageList(state) {
            return klona(state.messageList);
        }
    },
    persist: {
        storage: localStorage,
        paths: ['lang', 'primaryColor', 'startNoticeTime', 'endNoticeTime']
    }
});

import { useWebNotification } from '@vueuse/core';
import { useAppStore } from '@/store/app';
import { klona } from 'klona';
let timer;
// 设置消息列表
function setList() {
    if (timer) {
        clearTimeout(timer);
    }
    let messageList = klona(useAppStore().getMessageList);
    messageList.sort((a, b) => a.date.getTime() - b.date.getTime());
    if (messageList.length > 0) {
        notice(messageList);
    }
}
// 设置消息提醒
function notice(list) {
    const now = new Date();
    const next = list.find(item => item.date > now);
    if (next) {
        let restTime = next.date.getTime() - now.getTime();
        timer = window.setTimeout(() => {
            showNotice(next.title, next.body);
            list = list.filter(data => data !== next);
            if (list.length > 0) {
                notice(list);
            }
        }, restTime);
    }
    //     schedule.scheduleJob(next.date, () => {
    //         showNotice(next.title, next.body)
    //         list = list.filter(date => date !== next)
    //         if (list.length > 0) {
    //             notice(list)
    //         }
    //     })
    // }
}
function showNotice(title, body) {
    const { isSupported, notification, show, close, onClick, onShow, onError, onClose } = useWebNotification({
        title,
        body,
        dir: 'auto',
        lang: 'en',
        renotify: true,
        tag: 'test'
    });
    if (isSupported) {
        show();
    }
}
export default setList;

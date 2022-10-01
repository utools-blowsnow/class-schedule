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
        console.log('设置消息列表', messageList);
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
    window.utools.showNotification(`[ ${title} ] ${body}`);
}
export default setList;
//# sourceMappingURL=notice.js.map
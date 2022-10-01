import { useAppStore } from '@/store/app';
import { createI18n } from 'vue-i18n';
// const appStore = useAppStore()
import dateTimeFormats from './dataFormats.json';
import zhCN from './zh-CN.json';
import en from './en.json';
const messages = {
    'zh-CN': zhCN,
    'en-US': en
};
export function installI18n(app) {
    const i18n = createI18n({
        locale: useAppStore().lang,
        fallbackLocale: 'zh-CN',
        globalInjection: true,
        messages,
        dateTimeFormats
    });
    if (app) {
        app.use(i18n);
    }
    return i18n;
}
//# sourceMappingURL=index.js.map
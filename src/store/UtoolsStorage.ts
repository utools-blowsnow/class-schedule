const utools = (window as any).utools

class UtoolsStorage implements Storage {

    getItem(key: string): string | null {

        let doc = utools.db.get(key);

        console.log('getItem', key,doc);

        if (doc) return doc.data;
        return null;
    }

    removeItem(key: string): void {
        utools.db.remove(key);
    }

    setItem(key: string, value: string): void {
        console.log('setItem', key,value);

        let doc = utools.db.get(key);
        if (doc) {   // 更新数据
            utools.db.put({
                _id: key,
                data: value,
                _rev: doc._rev
            })
            return;
        }
        // 创建数据
        utools.db.put({
            _id: key,
            data: value
        })
    }

    [name: string]: any;

    length: number = 0;

    clear(): void {
    }

    key(index: number): string | null {
        return null;
    }

}

export const utoolsStorage = new UtoolsStorage();

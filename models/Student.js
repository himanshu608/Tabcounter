import Realm from "realm";

export class Student extends Realm.Object {
    static schema = {
        name : 'Student',
        properties: {
            _id: 'objectId',
            name: 'string',
            rollNo: { type: 'int', indexed: true },
            class: 'int',
            gender : 'string'
        },
        primaryKey: '_id',
    };
}

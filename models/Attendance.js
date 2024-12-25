import Realm from "realm";

export class Attendance extends Realm.Object {
    static schema = {
        name : 'Attendance',
        properties: {
            _id: 'objectId',
            name: 'string',
            rollNo: { type: 'int', indexed: true },
            class: 'int',
            gender: 'string',
            date : 'string',
            isPresent: 'bool'
        },
        primaryKey: '_id',
    };
}

import Realm from 'realm';
import {QUESTION} from '../constants'
export class QuestionSchema extends Realm.Object {}

QuestionSchema.schema = {
    name: QUESTION,
    primaryKey: 'id',
    properties: {
        id: {type: 'int',indexed: true },
        question: {type: 'string'},
        sent_status: {type:'bool', default:false}
    },
};
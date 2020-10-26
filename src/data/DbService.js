import Realm from 'realm';
import {QuestionSchema} from './Schema'
import {QUESTION} from '../constants';

//Create or use existing database
let dB = new Realm({ schema: [QuestionSchema.schema] });

//Query
let DbService = {
    getAll: function () {
        return new Promise((resolve, reject) => {
            try {
                let data = dB.objects(QUESTION);
                resolve(data)
            } catch (ex) {
                reject(ex)
            }
        })
    },
    save: function (quest) {
        return new Promise((resolve, reject) => {
            try {
                dB.write(() => {dB.create(QUESTION, quest);})
                resolve()
            } catch (ex) {
                reject(ex)
            }
        })
    },
    getRows: function () {
        return new Promise((resolve, reject) => {
            try {
                const rows = dB.objects(QUESTION).length;
                resolve(rows);
            } catch (ex) {
                reject(ex)
            }
        })
    }
};

module.exports = DbService;

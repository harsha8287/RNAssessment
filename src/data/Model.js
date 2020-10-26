class QuestionModel {
  constructor(id, question, sent_status) {
    this.id = id;
    this.question = question;
    this.sent_status = sent_status;
  }
}
module.exports = QuestionModel;
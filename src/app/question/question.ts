export class Question {
    constructor(
        public user_id: number,
        public question: string,
        public typeQuestion: string,
        public choice: string,
        public answers: Array<string>
    ) {
    }
}
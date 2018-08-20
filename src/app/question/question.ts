export class Question {
    constructor(
        public question: string,
        public type_id: number,
        public choice: string,
        public answers: Array<string>
    ) {
    }
}
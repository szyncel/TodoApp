import { getLocaleDateTimeFormat } from '@angular/common';

export class Todo {
    _id: string;
    title: string;
    description: string;
    date: Date;
    status: string;
    _creator:string;

    constructor(
    ) {
        this.title = ""
        this.description = ""
        this.date = new Date();
        this.status = ""
        this._creator=""
    }
}
export class Reminder {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public creatorId: number,
    public dueDate: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

import { TaskType } from '../db/interfaces';

export default class TaskTypeService {
  async getTaskTypeList(): Promise<TaskType[]> {
    return [
      {
        typeId: 'TODO',
        label: 'ToDo',
        description:
          'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
        parentTypeIds: ['TASK'],
        fieldsIds: ['TITLE', 'PRIORITY', 'STATUS', 'NOTIFICATIONS', 'NOTE'],
      },
      {
        typeId: 'GOAL',
        label: 'Goal',
        description:
          'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie postępu',
        parentTypeIds: ['TASK'],
        fieldsIds: ['TITLE', 'PRIORITY', 'STATUS', 'NOTIFICATIONS', 'PROGRESS'],
      },
      {
        typeId: 'EVENT',
        label: 'Event',
        description:
          'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
        parentTypeIds: ['TODO'],
        fieldsIds: [
          'TITLE',
          'PRIORITY',
          'STATUS',
          'NOTIFICATIONS',
          'NOTE',
          'LOCATION',
          'DATE_TIME',
          'DURATION',
        ],
      },
      {
        typeId: 'MEETING',
        label: 'Meeting',
        description:
          'Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.',
        parentTypeIds: ['EVENT'],
        fieldsIds: [
          'TITLE',
          'PRIORITY',
          'STATUS',
          'NOTIFICATIONS',
          'NOTE',
          'LOCATION',
          'DATE_TIME',
          'DURATION',
          'PERSON',
        ],
      },
      {
        typeId: 'ROUTINE',
        label: 'Routine',
        description:
          'Zadanie typu rutyna pozwala na ustawienie akcji do wykonania w danych cyklu.',
        parentTypeIds: ['TASK'],
        fieldsIds: [
          'TITLE',
          'PRIORITY',
          'STATUS',
          'NOTIFICATIONS',
          'CYCLE',
          'ACTION',
          'ACTIVE',
        ],
      },
    ];
  }
}

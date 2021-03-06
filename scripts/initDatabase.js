var DB_NAME = 'lifeapp';

print(`Initializing db with name: ${DB_NAME}`);

db.getSiblingDB(DB_NAME).tasks.drop();
db.getSiblingDB(DB_NAME).tasktypes.drop();
db.getSiblingDB(DB_NAME).createCollection('tasks');
db.getSiblingDB(DB_NAME).createCollection('tasktypes');

db.getSiblingDB(DB_NAME).tasktypes.insert([{
  typeId: 'TASK',
  label: '',
  description: 'Pole bazowe',
  order: 0,
  fieldsIds: ['TITLE', 'PRIORITY', 'STATUS', 'NOTIFICATIONS'],
}, {
  typeId: 'TODO',
  label: 'ToDo',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
  order: 0,
  parentTypeIds: ['TASK'],
  fieldsIds: ['NOTE'],
}, {
  typeId: 'GOAL',
  label: 'Goal',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie postępu',
  order: 0,
  parentTypeIds: ['TASK'],
  fieldsIds: ['PROGRESS'],
}, {
  typeId: 'EVENT',
  label: 'Event',
  description: 'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
  order: 1,
  parentTypeIds: ['TODO'],
  fieldsIds: ['LOCATION', 'DATE_TIME', 'DURATION'],
}, {
  typeId: 'MEETING',
  label: 'Meeting',
  description: 'Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.',
  order: 2,
  parentTypeIds: ['EVENT'],
  fieldsIds: ['PERSON'],
}, {
  typeId: 'ROUTINE',
  label: 'Routine',
  description: 'Zadanie typu rutyna pozwala na ustawienie akcji do wykonania w danych cyklu.',
  order: 3,
  parentTypeIds: ['TASK'],
  fieldsIds: ['CYCLE', 'ACTION', 'ACTIVE'],
}]);

print('Collections:');
db.getSiblingDB(DB_NAME).getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${db.getSiblingDB(DB_NAME)[name].count()}`);
});

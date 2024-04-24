import assert from 'node:assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';
import { Database } from '../database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

(async () => {
  const parser = generate({
    high_water_mark: 64 * 64,
    length: 10
  }).pipe(
    parse()
  );

  let count = 0;
  let template = `Task ${count},Descrição da Task ${count}`;

  process.stdout.write('start\n');

  for await (const record of parser) {
    process.stdout.write(`${template}\n`);

    count++;
    template = `Task ${count},Descrição da Task ${count}`;

    const [title, description] = template.split(",")

    database.insert("tasks",{
      id: randomUUID(),
      title: title,
      description: description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    })

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  process.stdout.write('...done\n');

  assert.strictEqual(count, 10);
})();
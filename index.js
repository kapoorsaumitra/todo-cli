import fs from "fs";
import { program } from "commander";
import chalk from "chalk";

program.name("todo").description("CLI to manage todos ").version("1.0.0");

program
  .command("list")
  .description("list all todos")
  .option("-p, --pending", "list only pending todos")
  .option("-c, --completed", "list only completed todos")
  .action((options) => {
    fs.readFile("todos.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const todos = JSON.parse(data);
      let filteredTodos = todos;

      if (options.pending) {
        filteredTodos = todos.filter((todo) => !todo.completed);
      } else if (options.completed) {
        filteredTodos = todos.filter((todo) => todo.completed);
      }

      if (filteredTodos.length === 0) {
        console.log(chalk.yellowBright("No todos found!"));
      } else {
        console.log(chalk.blueBright("Todos:"));
        filteredTodos.forEach((todo, index) => {
          const status = todo.completed ? chalk.green("[✔]") : chalk.red("[ ]");
          console.log(`${status} ${index + 1}.${todo.task}`);
        });
      }
    });
  });

program
  .command("create")
  .description("create a todo")
  .argument("<todo>")
  .action((todo) => {
    fs.readFile("todos.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        todos.push({ task: todo, completed: false });
        fs.writeFile("todos.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(chalk.greenBright("Todo added successfully!"));
          }
        });
      }
    });
  });

program
  .command("remove")
  .description("remove a specific todo")
  .argument("[index]")
  .option("-a, --all", "removes all todos")
  .action((index, options) => {
    fs.readFile("todos.json", (err, data) => {
      if (err) console.log(err);
      else {
        let todos = JSON.parse(data);
        if (options.all) {
          todos = [];
        } else todos.splice(index - 1, 1);

        fs.writeFile("todos.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) console.log(err);
          else console.log(chalk.redBright("Deleted Successfully!"));
        });
      }
    });
  });

program
  .command("check")
  .description("mark a todo as done")
  .argument("[index]")
  .option("-a, --all", "marks all todos as done")
  .action((index, options) => {
    fs.readFile("todos.json", (err, data) => {
      if (err) console.log(err);
      else {
        const todos = JSON.parse(data);
        if (options.all) {
          for (let i = 0; i < todos.length; i++) {
            todos[i]["completed"] = true;
          }
        } else todos[index - 1]["completed"] = true;
        fs.writeFile("todos.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) console.log(err);
          else console.log(chalk.blueBright("Marked as Done!"));
        });
      }
    });
  });

program
  .command("uncheck")
  .description("mark a todo as not done")
  .argument("[index]")
  .option("-a, --all", "marks all todos as not done")
  .action((index, options) => {
    fs.readFile("todos.json", (err, data) => {
      if (err) console.log(err);
      else {
        const todos = JSON.parse(data);
        if (options.all) {
          for (let i = 0; i < todos.length; i++) {
            todos[i]["completed"] = false;
          }
        } else todos[index - 1]["completed"] = false;
        fs.writeFile("todos.json", JSON.stringify(todos, null, 2), (err) => {
          if (err) console.log(err);
          else console.log(chalk.redBright("Marked as Not Done!"));
        });
      }
    });
  });

program
  .command("stats")
  .description("display stats")
  .action(() => {
    fs.readFile("todos.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const todos = JSON.parse(data);

      let pendingTodos = todos.filter((todo) => !todo.completed);

      let completedTodos = todos.filter((todo) => todo.completed);

      console.log(chalk.blue("Stats:"));
      console.log(chalk.green(`Completed Todos: ${completedTodos.length}`));
      console.log(chalk.red(`Pending Todos: ${pendingTodos.length}`));
    });
  });

program.parse();

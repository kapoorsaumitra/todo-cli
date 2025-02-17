# todo-cli
a CLI-based todo list manager using node.js

# usage

### list all todos
`node index.js list`

### list only pending todos
`node index.js list --pending`

### list only completed todos
`node index.js list --completed
`
### create a new todo
`node index.js create "your task here"
`
### remove a specific todo
`node index.js remove <index>
`
### remove all todos
`node index.js remove --all
`
### mark a todo as done
`node index.js check <index>
`
### mark all todos as done
`node index.js check --all
`
### mark a todo as not done
`node index.js uncheck <index>
`
### mark all todos as not done
`node index.js uncheck --all
`
### display stats (completed & pending count)
`node index.js stats
`
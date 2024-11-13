import { Task } from 'wasp/entities'
import { getTasks, useQuery, createTask, updateTask } from 'wasp/client/operations'
import { ChangeEvent, FormEvent } from 'react'
import { logout } from 'wasp/client/auth'
import { Button } from '../components/ui/button'

import '../Main.css'

export const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks)

  return (
    <div>
      <NewTaskForm />
      <Button size={'lg'} onClick={logout}>Logout</Button>
      <Button size={'sm'} onClick={logout}>Logout</Button> 
      {tasks && <TasksList tasks={tasks} />}

      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
      <span className="text-3xl font-bold underline">
  Hello world!
</span>
    </div>
  )
}

const TaskView = ({ task }: { task: Task }) => {
  const handleIsDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      })
    } catch (error: any) {
      window.alert('Error while updating task: ' + error.message)
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      {task.description}
    </div>
  )
}

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (!tasks?.length) return <div>No tasks</div>

  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskView task={task} key={idx} />
      ))}
    </div>
  )
}

const NewTaskForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const target = event.target as HTMLFormElement
      const description = target.description.value
      target.reset()
      await createTask({ description })
    } catch (err: any) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value="Create task" />
    </form>
  )
}
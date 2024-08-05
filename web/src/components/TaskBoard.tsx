import React, { useEffect, useState } from 'react';
import { getActiveTasks, getAllTasks, getCompletedTasks, createTask, completeTask, Task } from '../modules/taskManager';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';

const TaskBoard: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  useEffect(() => {
    setActiveTasks(getActiveTasks());
    setAllTasks(getAllTasks());
    setCompletedTasks(getCompletedTasks());
  }, []);

  const handleCreateTask = () => {
    createTask(newTaskTitle, newTaskDescription, 'Intern', 1);
    setActiveTasks(getActiveTasks());
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleCompleteTask = (title: string) => {
    completeTask(title);
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  };

  return (
    <div>
      <h2>Active Tasks</h2>
      <List>
        {activeTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <Button onClick={() => handleCompleteTask(task.title)}>Complete</Button>
          </ListItem>
        ))}
      </List>

      <h2>All Tasks</h2>
      <List>
        {allTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>

      <h2>Completed Tasks</h2>
      <List>
        {completedTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>

      <h2>Create New Task</h2>
      <TextField label="Title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
      <TextField label="Description" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
      <Button onClick={handleCreateTask}>Create Task</Button>
    </div>
  );
};

export default TaskBoard;

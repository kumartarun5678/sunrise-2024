export interface Task {
    id: number;
    title: string;
    description: string;
    persona: string;
    group: number;
    completed: boolean;
  }
  
  let tasks: Task[] = [];
  let activeTasks: Task[] = [];
  let completedTasks: Task[] = [];
  let taskIdCounter = 1;
  
  export function initializeTasks() {
    tasks = [
      { id: taskIdCounter++, title: 'Initial Setup', description: 'Setup your development environment.', persona: 'Intern', group: 1, completed: false },
      { id: taskIdCounter++, title: 'Basic Introduction', description: 'Introduction to the project.', persona: 'Intern', group: 1, completed: false },
      // Add other tasks here...
    ];
    activeTasks = tasks.filter(task => task.group === 1);
    completedTasks = [];
  }
  
  export function getActiveTasks(): Task[] {
    return activeTasks;
  }
  
  export function getAllTasks(): Task[] {
    return tasks;
  }
  
  export function getCompletedTasks(): Task[] {
    return completedTasks;
  }
  
  export function createTask(title: string, description: string, persona: string, group: number) {
    const newTask: Task = { id: taskIdCounter++, title, description, persona, group, completed: false };
    tasks.push(newTask);
    if (group === 1) {
      activeTasks.push(newTask);
    }
  }
  
  export function updateTask(id: number, updates: Partial<Task>) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      Object.assign(task, updates);
    }
  }
  
  export function deleteTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    activeTasks = activeTasks.filter(task => task.id !== id);
    completedTasks = completedTasks.filter(task => task.id !== id);
  }
  
  export function completeTask(title: string) {
    const task = tasks.find(task => task.title === title);
    if (task) {
      task.completed = true;
      activeTasks = activeTasks.filter(t => t.id !== task.id);
      completedTasks.push(task);
      // Unlock next group if all tasks in the current group are completed
      const currentGroupTasks = tasks.filter(t => t.group === task.group);
      const allCompleted = currentGroupTasks.every(t => t.completed);
      if (allCompleted) {
        const nextGroupTasks = tasks.filter(t => t.group === task.group + 1);
        activeTasks.push(...nextGroupTasks);
      }
    }
  }
  

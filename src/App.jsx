import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingTaskDescription, setEditingTaskDescription] = useState('');

  const addTask = () => {
    if (inputTask.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: inputTask, description: inputDescription }]);
      setInputTask('');
      setInputDescription('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, text, description) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
    setEditingTaskDescription(description);
  };

  const saveEditedTask = () => {
    const editedTasks = tasks.map(task => {
      if (task.id === editingTaskId) {
        return { ...task, text: editingTaskText, description: editingTaskDescription };
      }
      return task;
    });
    setTasks(editedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
    setEditingTaskDescription('');
  };

  return (
    <div className="container mx-auto mt-8 p-5">
  <h1 className="text-3xl font-bold mb-4 text-center">ToDo App</h1>
  <br />
  <div className="flex flex-col md:flex-row items-center justify-center mb-4">
    <input
      type="text"
      className="w-full md:w-64 py-2 px-4 border border-gray-400 rounded-l mb-2 md:mb-0 md:mr-2"
      placeholder="Enter task"
      value={inputTask}
      onChange={(e) => setInputTask(e.target.value)}
    />
    <input
      type="text"
      className="w-full md:w-64 py-2 px-4 border border-gray-400 rounded-l mb-2 md:mb-0 md:mr-2"
      placeholder="Enter description"
      value={inputDescription}
      onChange={(e) => setInputDescription(e.target.value)}
    />
    <button
      className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      onClick={addTask}
    >
      Add Todo
    </button>
  </div>
  <br />
  <h1 className="text-2xl font-bold mb-4 text-center">My ToDo's</h1>
  <br />
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {tasks.map(task => (
      <div key={task.id} className="bg-zinc-50 rounded-3xl border-2 p-4 shadow-xl relative">
        <h2 className="text-lg font-semibold mb-2">Name : {task.text}</h2>
        <p className="text-gray-700 mb-2">Description : {task.description}</p>
        <div className="absolute bottom-4 right-4">
          {editingTaskId === task.id ? (
            <div className="flex">
              <input
                type="text"
                className="w-full py-1 px-2 border border-gray-400 rounded-l"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
              />
              <input
                type="text"
                className="w-full py-1 px-2 border border-gray-400 rounded-l"
                value={editingTaskDescription}
                onChange={(e) => setEditingTaskDescription(e.target.value)}
              />
              <button
                className="py-1 px-2 bg-green-500 text-white rounded-r hover:bg-green-600 ml-2"
                onClick={saveEditedTask}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                className="py-1 px-2 bg-blue-500 text-white rounded-l hover:bg-blue-600"
                onClick={() => editTask(task.id, task.text, task.description)}
              >
                Edit
              </button>
              <button
                className="py-1 px-2 bg-red-500 text-white rounded-r hover:bg-red-600 ml-2"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default App;

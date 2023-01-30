import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';

function App() {
  //task (todo list state)
  const [toDo, setToDo] = useState([
    { id: 2, title: "Task 2", status: false },
    { id: 1, title: "Task 1", status: false },
  ]);

  //temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //add task function
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      // let newEntry = { id: num, title: newTask, status: false };
      // setToDo([...toDo, newEntry])

      //REFACTOR
      setToDo([...toDo, { id: num, title: newTask, status: false }])

      setNewTask('');
    }
  };

  //delete task function
  const deleteTask = (id) => {
    // let newTasks = toDo.filter(task => task.id !== id) //we use filter to record to match the id first we compare at this line then we delete it will try to find the matching id
    // console.log(newTasks);

    //refactor 
    setToDo(toDo.filter(task => task.id !== id));
  }

  //Mark task as done or complete
  const markDone = (id) => {
    // let newTask = toDo.map(task => {
    //   if (task.id === id) {
    //     return ({ ...task, status: !task.status })
    //   } return task;
    // });
    // setToDo(newTask)

    //refactor
    setToDo(toDo.map(
      task => task.id === id ? ({ ...task, status: !task.status }) : (task)
    ))
  };

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  //change task for update
  const changeHolder = (e) => {
    // let newEntry = {
    //   id: updateData.id,
    //   title: e.target.value,
    //   status: updateData.status ? true : false
    // };
    // setUpdateData(newEntry);

    //refactor
    setUpdateData({
      ...updateData,
      title: e.target.value
    })
  };

  //update task
  const updateTask = () => {
    // let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    // let updatedObject = [...filterRecords, updateData];
    // setToDo(updatedObject);

    //refactor
    let removeOLdRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOLdRecord,
      updateData
    ])
    setUpdateData('');
  };

  return (

    <div className="container App">
      <br />
      <br />
      <h2>Todo List App(React.Js)</h2>
      <br />
      <br />
      {/* Update task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeHolder={changeHolder}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}


      {/* Display todos */}
      {toDo && toDo.length ? '' : 'No Tasks...'}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;

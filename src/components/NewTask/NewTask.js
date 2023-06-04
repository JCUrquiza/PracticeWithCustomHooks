import useHttp from '../../hooks/useHttp';
import useFetch from '../../hooks/useHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskDate) => {
    
    const generateId = taskDate.name;
    const createdTask = { id: generateId, text: taskText };

    props.onAddTask(createdTask);

  }

  const enterTaskHandler = async (taskText) => {

    sendTaskRequest({ 
      url: 'https://react-http-81b99-default-rtdb.firebaseio.com/task.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { text: taskText }
    }, createTask.bind(null, taskText));
    
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

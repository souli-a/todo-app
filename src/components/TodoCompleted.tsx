import { InitialState } from '../stores/slices/todoSlice';
import { LanguageState } from '../stores/slices/languageSlice';
import { ThemeState } from '../stores/slices/themeSlice';
import { useSelector } from 'react-redux';
import '../styles/components/todo-completed.scss';

const TodoCompleted = () => {
  const todos = useSelector((state: { todos: InitialState[] }) => state.todos);

  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const todosCompleted = todos.filter((obj) => !obj.isDone).length;

  const todoCompletedContainerClassName =
    theme === 'light'
      ? 'todo-completed-container todo-completed-container-light'
      : 'todo-completed-container todo-completed-container-dark';

  const todoCompletedContainerContent =
    language === 'french'
      ? `Tâches restantes : ${todosCompleted}`
      : `Remaining tasks: ${todosCompleted}`;

  return (
    <div className={todoCompletedContainerClassName}>
      <h1 className="title-todo-completed">{todoCompletedContainerContent}</h1>
    </div>
  );
};

export default TodoCompleted;

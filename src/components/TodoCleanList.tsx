import { LanguageState } from '../stores/slices/languageSlice';
import { ThemeState } from '../stores/slices/themeSlice';
import { deleteTodoCompleted, deleteAllTodo } from '../stores/slices/todoSlice';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/todo-clean-list.scss';
import Button from './ui/Button';

const TodoCompleted = () => {
  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const dispatch = useDispatch();

  const handleDeleteTodoCompleted = () => {
    dispatch(deleteTodoCompleted());
  };

  const handleDeleteAllTodo = () => {
    dispatch(deleteAllTodo());
  };

  const buttonBasicClassName =
    theme === 'light'
      ? 'button button-basic-light'
      : 'button button-basic-dark';

  const buttonRedClassName =
    theme === 'light' ? 'button button-red-light' : 'button button-red-dark';

  const deleteAllTodoButtonContent =
    language === 'french' ? 'Tout effacer' : 'Delete all';

  const deleteCompletedTodoButtonContent =
    language === 'french'
      ? 'Effacer les taches terminées'
      : 'Delete finished tasks';

  return (
    <div className="todo-clean-list-container">
      <Button
        className={buttonBasicClassName}
        onClick={handleDeleteTodoCompleted}
      >
        {deleteCompletedTodoButtonContent}
      </Button>
      <Button className={buttonRedClassName} onClick={handleDeleteAllTodo}>
        {deleteAllTodoButtonContent}
      </Button>
    </div>
  );
};

export default TodoCompleted;

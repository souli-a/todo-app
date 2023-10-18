import TodoList from '../components/TodoList';
import Header from '../components/Header';
import '../styles/pages/todo-page.scss';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageState, updateLanguage } from '../stores/slices/languageSlice';
import { updateTheme, ThemeState } from '../stores/slices/themeSlice';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Todo = () => {
  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const dispatch = useDispatch();

  useDocumentTitle({
    frenchTitle: 'Application - Tâches',
    englishTitle: 'App - Todo',
    language: language,
  });

  useLocalStorage({
    setter: (newLanguage) => dispatch(updateLanguage(newLanguage)),
    localStorageItemName: 'language',
    state: language,
  });

  useLocalStorage({
    setter: (newTheme) => dispatch(updateTheme(newTheme)),
    localStorageItemName: 'theme',
    state: theme,
  });

  const todoPageContainerClassName =
    theme === 'light'
      ? 'todo-page-container todo-page-container-light'
      : 'todo-page-container todo-page-container-dark';

  return (
    <div className={todoPageContainerClassName}>
      <Header />
      <TodoList />
    </div>
  );
};

export default Todo;

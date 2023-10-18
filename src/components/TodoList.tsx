import { useState, useRef, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import SortableItem from './SortableItem';
import TodoCleanList from './TodoCleanList';
import { useEventListener, EventType } from '../hooks/useEventListener';
import { LanguageState } from '../stores/slices/languageSlice';
import { ThemeState } from '../stores/slices/themeSlice';
import {
  addTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodoItemsOrder,
  updateTodoDescription,
  InitialState,
} from '../stores/slices/todoSlice';
import autoAnimateOptions from '../utils/autoAnimateOptions';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import '../styles/components/todo-list.scss';
import useDetectOuterClick from '../hooks/useDetectOuterClick';
import TodoCompleted from './TodoCompleted';

const TodoList = () => {
  const todos = useSelector((state: { todos: InitialState[] }) => state.todos);
  const theme = useSelector((state: { theme: ThemeState }) => state.theme);
  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const [parent] = useAutoAnimate(autoAnimateOptions);
  const [selectedDraggableTodo, setSelectedDraggableTodo] = useState<
    string | null | number
  >(null);
  const [editInputActive, setEditInputActive] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setSelectedDraggableTodo(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setSelectedDraggableTodo(null);

    const { active, over } = event;

    if (active && over && active.id === over.id) {
      return;
    }

    if (active && over) {
      const newArray = arrayMove(
        todos.slice(),
        todos.findIndex((todo) => todo.id === active.id),
        todos.findIndex((todo) => todo.id === over.id)
      );

      dispatch(updateTodoItemsOrder(newArray));
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodoStatus = (id: string) => {
    dispatch(updateTodoStatus(id));
  };

  const addAndUpdateTodoWithEnterKey = (e: EventType, inputValue: string) => {
    if (e.type === 'keydown' && 'key' in e) {
      if (e.key === 'Enter' && inputValue && !editInputActive) {
        dispatch(addTodo(inputValue));
        setInputValue('');
      }
      if (e.key === 'Enter' && inputValue && editInputActive) {
        handleUpdateTodoDescription();
      }
    }
  };

  const startEditingTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      if (editInputActive && id === selectedTodoId) {
        setEditInputActive(false);
        setInputValue('');
        setSelectedTodoId('');
      } else {
        setInputValue(todo.description);
        setSelectedTodoId(id);
        setEditInputActive(true);
        editInputRef.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (editInputRef.current && editInputActive) {
      editInputRef.current.focus();
    }
  }, [editInputActive]);

  useEffect(() => {
    const todo = todos.filter((todo) => todo.id === selectedTodoId);
    if (todo.length < 1) {
      setEditInputActive(false);
      setSelectedTodoId('');
    }
  }, [todos]);

  const handleUpdateTodoDescription = () => {
    if (inputValue !== '') {
      dispatch(
        updateTodoDescription({
          id: selectedTodoId,
          description: inputValue,
        })
      );
    }
    setEditInputActive(false);
    setInputValue('');
    setSelectedTodoId('');
  };

  useEventListener({
    event: 'keydown',
    eventHandler: (e: EventType) => {
      addAndUpdateTodoWithEnterKey(e, inputValue);
    },
  });

  useDetectOuterClick({
    elementRef: editInputRef,
    handleFunctions: () => {
      setInputValue('');
      setEditInputActive(false);
      setSelectedTodoId('');
    },
  });

  const addIcon = <Icon icon="fluent-emoji-high-contrast:plus" />;
  const editIcon = <Icon icon="basil:edit-solid" />;
  const deleteIcon = <Icon icon="ic:round-delete" />;
  const sendIcon = (
    <Icon icon="streamline:mail-send-reply-email-reply-message-actions-action-arrow" />
  );

  const buttonAddEditTodoClassName =
    theme === 'light'
      ? 'button button-add-edit-todo-light'
      : 'button button-add-edit-todo-dark';

  const buttonStartEditTodoClassName =
    theme === 'light'
      ? 'button button-start-edit-todo-light'
      : 'button button-start-edit-todo-dark';

  const buttonDeleteTodoClassName =
    theme === 'light'
      ? 'button button-delete-todo-light'
      : 'button button-delete-todo-dark';

  const inputAddEditTodoClassName =
    theme === 'light'
      ? 'input input-add-edit-todo-light'
      : 'input input-add-edit-todo-dark';

  const oneTodoClassName =
    theme === 'light'
      ? 'one-todo-container one-todo-container-light'
      : 'one-todo-container one-todo-container-dark';

  const todoOverlayClassName =
    theme === 'light'
      ? 'todo-overlay one-todo-container-light'
      : 'todo-overlay one-todo-container-dark';

  const checkboxClassName =
    theme === 'light'
      ? 'checkbox-basic checkbox-basic-light'
      : 'checkbox-basic checkbox-basic-dark';

  const titleContent =
    language === 'french' && !editInputActive
      ? 'Ajout'
      : language === 'french' && editInputActive
      ? 'Modification'
      : language === 'english' && !editInputActive
      ? 'Add'
      : language === 'english' && editInputActive
      ? 'Edit'
      : '';

  const placeholderEditInput =
    language === 'french' ? 'Modifier la tâche' : 'Edit the task';

  const placeholderAddInput =
    language === 'french' ? 'Ajoutez une tâche' : 'Add a task';

  const editTodoButtonContent = language === 'french' ? 'Modifier' : 'Edit';

  const addTodoButtonContent = language === 'french' ? 'Ajouter' : 'Add';

  return (
    <div className="full-page-size-container">
      <div className="todo-container">
        <h1 className="title-todo-container">{titleContent}</h1>
        <div className="add-todo-container">
          {editInputActive ? (
            <>
              <Input
                placeholder={placeholderEditInput}
                type="text"
                value={inputValue}
                onChange={handleInputValue}
                className={inputAddEditTodoClassName}
                inputRef={editInputRef}
              />
              <Button
                className={buttonAddEditTodoClassName}
                onClick={handleUpdateTodoDescription}
              >
                {sendIcon}
                {editTodoButtonContent}
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder={placeholderAddInput}
                type="text"
                value={inputValue}
                onChange={handleInputValue}
                className={inputAddEditTodoClassName}
              />
              <Button
                className={buttonAddEditTodoClassName}
                onClick={handleAddTodo}
              >
                {addIcon}
                {addTodoButtonContent}
              </Button>
            </>
          )}
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <div className="all-todo-container" ref={parent}>
              {todos &&
                todos.map((todo) => (
                  <SortableItem
                    className={oneTodoClassName}
                    key={todo.id}
                    id={todo.id}
                  >
                    <Checkbox
                      className={checkboxClassName}
                      onClick={() => handleUpdateTodoStatus(todo.id)}
                      isChecboxChecked={todo.isDone}
                    />
                    <div className="todo">
                      <p
                        className={
                          todo.id === selectedTodoId && editInputActive
                            ? 'animation-dots'
                            : 'todo-description'
                        }
                      >
                        {todo.id === selectedTodoId ? '' : todo.description}
                      </p>
                    </div>
                    <Button
                      onClick={() => startEditingTodo(todo.id)}
                      className={buttonStartEditTodoClassName}
                    >
                      {editIcon}
                    </Button>
                    <Button
                      className={buttonDeleteTodoClassName}
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      {deleteIcon}
                    </Button>
                  </SortableItem>
                ))}
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {selectedDraggableTodo && (
              <div className={todoOverlayClassName}></div>
            )}
          </DragOverlay>
        </DndContext>
        <TodoCleanList />
        <TodoCompleted />
      </div>
    </div>
  );
};

export default TodoList;

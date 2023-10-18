import { useSortable } from '@dnd-kit/sortable';

interface SortableItem {
  id: string;
  children: React.ReactNode;
  className: string;
}
const SortableItem = ({ id, children, className }: SortableItem) => {
  const { attributes, listeners, setNodeRef, transition, isDragging } =
    useSortable({
      id: id,
    });

  const style = {
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      className={className}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default SortableItem;

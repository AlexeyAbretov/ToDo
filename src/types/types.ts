// Описываем один элемент в todo
export type ToDoItemType = {
  id: string;
  title: string;
  isFinish: boolean;
};

// Описываем список элементов и используем в компоненте (list)
export type ToDoListType = Array<ToDoItemType>;

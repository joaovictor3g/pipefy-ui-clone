import { createContext, useContext, useState } from 'react';
import { loadLists } from '../services/api';
import produce from 'immer';

interface ContextData {
  data: {
    title: string;
    creatable: boolean,
    cards: {
      id: number,
      content: string,
      labels: string[],
      user?: string | undefined;
    }[],
    done?: boolean
  }[],
  move: (fromList: number, from: number, toList: number, to: number) => void;
}

interface DragNDropProviderProps {
  children: React.ReactNode;
}

export const DragNDropContext = createContext({} as ContextData);

const data = loadLists();

export function DragNDropProvider({ children }: DragNDropProviderProps) {
  const [lists, setLists] = useState(data);
  
  function handleMove(fromList: number, toList: number, from: number, to: number) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }
  
  return (
    <DragNDropContext.Provider
      value={{
        data: lists,
        move: handleMove
      }}
    >
      {children}
    </DragNDropContext.Provider>
  )
}

export function useDragNDropContext() {
  return useContext(DragNDropContext);
}
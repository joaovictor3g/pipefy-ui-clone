import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDragNDropContext } from '../../contexts/DragNDropContext';

import { Container, Label } from "./styles";

interface ICardProps {
  data: {
    id: number,
    content: string,
    labels: string[],
    user?: string | undefined;
  },
  index: number,
  listIndex: number;
}

export function Card({ data, index, listIndex }: ICardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { move } = useDragNDropContext();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {
      index,
      content: data.content,
      id: data.id,
      listIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: { id: number, index: number, listIndex: number }, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if(draggedIndex===targetIndex && draggedListIndex === targetListIndex)
        return;

      if(ref.current) {
        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom-targetSize.top)/2;
        
        const draggedOffSet = monitor.getClientOffset();

        if(draggedOffSet) {
          const draggedTop = draggedOffSet.y - targetSize.top;
          
          if(draggedIndex < targetIndex && draggedTop < targetCenter) {
            return;
          }

          if(draggedIndex > targetIndex && draggedTop > targetCenter) {
            return;
          }

          move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
          
          item.index = targetIndex;
          item.listIndex = targetListIndex;
        }
      }
    }
  })
  
  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>

      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  )
}
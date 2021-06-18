import { Container } from "./styles";
import { List } from '../List';
import { useDragNDropContext } from '../../contexts/DragNDropContext';

export function Board() {
  const { data } = useDragNDropContext();

  return (
    <Container>
      {data.map((list, idx: number) => (
        <List key={list.title} index={idx} data={list}/>
      ))}
    </Container>
    
  );
}
import { Container } from "./styles";
import { MdAdd } from 'react-icons/md';

import { Card } from '../Card';

interface IListProps {
  title: string;
  creatable: boolean,
  cards: {
    id: number,
    content: string,
    labels: string[],
    user?: string | undefined;
  }[],
  done?: boolean
}

interface Data {
  data: IListProps,
  index: number;
}

export function List({ data, index: listindex }: Data) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF"/>
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, idx: number) => <Card key={card.id} listIndex={listindex} index={idx} data={card}/>)}
      </ul>
    </Container>
  );
}
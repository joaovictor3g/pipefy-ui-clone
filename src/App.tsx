import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GlobalStyle from './styles/global';
import { Header } from './components/Header'
import { Board } from './components/Board';
import { DragNDropProvider } from './contexts/DragNDropContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Header />
      <DragNDropProvider>
        <Board />
      </DragNDropProvider>
    </DndProvider>
  );
}

export default App;

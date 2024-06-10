import logo from './logo.svg';
import TodoList from './components/TodoList';
import { Button, Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Panel header={<h3>RSuite Components</h3>} bordered>
        <Button appearance="primary">Primary Button</Button>
        <Button appearance="ghost">Ghost Button</Button>
      </Panel>
    </div>
  );
}

export default App;

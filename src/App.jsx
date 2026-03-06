import React from 'react'
import LifecycleDemo from './LifeCycleDemo';
import UpdatingDemo from './LifeCycleUpdate';
import Counter from './counter';
import ListManager from './ListManager';
import ColorBox from './ColorBox';
import NotesManager from './NotesManager';
import TodoList from './TodoList';
import Events from './components/Events';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    /*<div>
      <LifecycleDemo />
      <UpdatingDemo />
      <Counter initialCount={10} step={5} />
<ListManager
  initialItems={["React", "Angular", "VueJs"]}
  placeholder="Framework..."
/>
<ColorBox/>
<NotesManager />
<TodoList />

    </div>*/
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App

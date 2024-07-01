import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Store/Store.ts';
import { BrowserRouter as DomProvider } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DomProvider>
      <App />
    </DomProvider>
  </Provider>


)

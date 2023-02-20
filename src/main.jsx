import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
// for getting redux store
import { store } from './store/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
 
  //   {/* provider for redux store */}
    <Provider store={store}>
    <App />
    </Provider>
 
)

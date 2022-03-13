import React, {
  Component
} from "react"
import './App.css'
import {
  HomePage
} from './pages/HomePage';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: JSON.parse(localStorage.getItem('likes')),
    }
  }




  render() {
    const {
      storage
    } = this.state;
    return <HomePage storage = {
      storage
    }
    / >
  }
}
export default App
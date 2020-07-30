import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      {name: 'waldi', age: 234},
      {name: 'manu', age: 22}
    ]

  })

  const [otherState, otherSetState] = useState({
    otherstate: 'bla blub'
  })

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        {name: newName, age: 234},
        {name: 'manu', age: 22}
      ]
    })
  }

  const nameChangedHandler = (event) => {
    setPersonsState({
      persons: [
        {name: 'waldi', age: 234},
        {name: event.target.value, age: 22}
      ]
    })
  }

    return (
      
      <div className="App">
      <h1>sdfsdfsdfsdf</h1>
      <button onClick={() => switchNameHandler('clairo')}>buhton</button>
      <Person 
        name={personsState.persons[0].name} 
        age={personsState.persons[0].age}
        click={switchNameHandler.bind(this,'doerte')}
        />
      <Person 
        name={personsState.persons[1].name} age={personsState.persons[1].age}
        changed={nameChangedHandler}>hobbies </Person>

      </div>
    );

}

export default App;

/* state = {
  persons: [
    {name: 'max', age: 234},
    {name: 'manu', age: 22}
  ]
}


switchNameHandler = () => {
  this.setState({
    persons: [
      {name: 'waldi', age: 234},
      {name: 'manu', age: 22}
    ]
  })
} */
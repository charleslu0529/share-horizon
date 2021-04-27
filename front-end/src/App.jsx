import { Route, Switch } from 'react-router';
import Browse from './components/Browse/Browse';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/" render={(props) = <Browse {...props}/>}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;

import  {BrowserRouter, Route, Switch} from 'react-router-dom';
import  {AdminRoom}  from './pages/AdminRoom';

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { AuthContextProvider } from './contexts/AuthContext';
import { Rooms } from './pages/Rooms';

// Switch ele nunca deixa duas rotas ser chamada mesmo tempo 


 export function App () {


  return (

    <BrowserRouter> {/* Rotas da aplicação */} 

    <AuthContextProvider>

      <Switch>

    <Route path="/" exact component={Home} />
    <Route path="/rooms/new" component={NewRoom} />
    <Route path="/rooms/:id" component={Rooms} />
    <Route path="/admin/rooms/:id" component={AdminRoom} />

     </Switch>

    </AuthContextProvider>

    </BrowserRouter>


  );
}


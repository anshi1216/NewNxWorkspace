// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { Route, Routes, Link } from 'react-router-dom';
import AdminApprovalPage from './AdminApprovalPage';
import { Header, Footer} from '@ticketing-workspace/reactLib';

export function App() {
  return (
    <div>
      <Header/>
      <AdminApprovalPage/>
      <Footer/>

     </div>
  );
}

export default App;

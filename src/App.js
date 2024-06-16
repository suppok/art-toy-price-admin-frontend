import CustomSidenav from './components/shared/CustomSidenav';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <CustomSidenav />
        <div className="main-container">
          {/* <CustomNavbar /> */}
          <div className="content-container">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

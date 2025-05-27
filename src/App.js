// import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import Home from './components/Home';
import About from './components/About';
import PartnerWithUs from './components/PartnerWithUs';
import ErrorBoundary from './components/ErrorBoundary';
import RestroDetailPage from './components/RestroDetailPage';
// import Career from './components/Career';

const Career = lazy(() => import ('./components/Career'));

const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  )
}

const browserRouter = (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} errorElement= {<ErrorBoundary />} />
        <Route path="/careers" element={
          <Suspense fallback={<h1>Loading....</h1>}>
            <Career />
          </Suspense>}
          errorElement= {<ErrorBoundary />}
        /> 
        <Route path="/partner-with-us" element={<PartnerWithUs />} errorElement= {<ErrorBoundary />} />
        <Route path="/restaurants/:id" element={<RestroDetailPage />} errorElement= {<ErrorBoundary />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(browserRouter);
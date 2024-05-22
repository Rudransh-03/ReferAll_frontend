import './App.css'
import Header from './components/Header'
import Home from './components/HomePage/Home'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeekReferral from './components/SeekReferral';
import ViewRequests from './components/ViewRequests';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReferralRequestPosts from './components/ReferralRequestPosts';
import ReferralRequestDetails from './components/ReferralRequestDetails';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="seek_referral" element={<SeekReferral />} />
        <Route path="view_requests/:id" element={<ViewRequests />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="refer" element={<ReferralRequestPosts />} />
        <Route path="/:jobId/:postId" element={<ReferralRequestDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

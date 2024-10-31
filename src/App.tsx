import './App.css'
import Header from './components/Header'
import Home from './components/HomePage/Home'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeekReferral from './components/SeekReferral/SeekReferral';
import ViewRequests from './components/ViewYourRequests/ViewRequests';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReferralRequestPosts from './components/ReferOthers/ReferralRequestPosts';
import Profile from './components/Profile';
import CreateJobPost from './components/CreateJobPost/CreateJobPost';
import ViewJobPosts from './components/ViewJobPosts/ViewJobPosts';
import YourJobPosts from './components/YourJobPosts/YourJobPosts';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="seek_referral" element={<SeekReferral />} />
            <Route path="view_requests" element={<ViewRequests />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="refer" element={<ReferralRequestPosts />} />
            <Route path='my_profile' element={<Profile />} />
            <Route path='create_job_post' element={<CreateJobPost />} />
            <Route path='view_job_posts' element={<ViewJobPosts />} />
            <Route path='your_job_posts' element={<YourJobPosts />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App

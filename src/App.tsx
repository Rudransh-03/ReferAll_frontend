import './App.css';
import Header from './components/Header';
import Home from './components/HomePage/Home';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeekReferral from './components/SeekReferral/SeekReferral';
import ViewRequests from './components/ViewYourRequests/ViewRequests';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReferralRequestPosts from './components/ReferOthers/ReferralRequestPosts';
import Profile from './components/Profile';
import CreateJobPost from './components/CreateJobPost/CreateJobPost';
import ViewJobPosts from './components/ViewJobPosts/ViewJobPosts';
import YourJobPosts from './components/YourJobPosts/YourJobPosts';
import PeopleYouReferred from './components/YourReferrals/PeopleYouReferred';
import ViewAppliedJobPosts from './components/ViewAppliedJobPosts/ViewAppliedJobPosts';

import { useDispatch } from 'react-redux';
import { userActions } from './store/user-slice';
import SessionChecker from './components/SessionChecker';

function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <SessionChecker /> {/* Place it here */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="seek_referral" element={<SeekReferral />} />
            <Route path="view_your_referrals" element={<PeopleYouReferred />} />
            <Route path="view_requests" element={<ViewRequests />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="refer" element={<ReferralRequestPosts />} />
            <Route path="my_profile" element={<Profile />} />
            <Route path="create_job_post" element={<CreateJobPost />} />
            <Route path="view_job_posts" element={<ViewJobPosts />} />
            <Route path="your_job_posts" element={<YourJobPosts />} />
            <Route path="your_applications" element={<ViewAppliedJobPosts />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

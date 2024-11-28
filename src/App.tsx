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

// import { useDispatch } from 'react-redux';
// import { userActions } from './store/user-slice';
import SessionChecker from './components/SessionChecker';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const userFirstName: string = useSelector((state: RootState) => state.user.firstName);
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <SessionChecker /> {/* Place it here */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={(userFirstName.length === 0) ? "/login" : "seek_referral"} element={(userFirstName.length === 0) ? <Login /> :<SeekReferral />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"view_your_referrals"} element={(userFirstName.length === 0) ? <Login /> :<PeopleYouReferred />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"view_requests"} element={(userFirstName.length === 0) ? <Login /> :<ViewRequests />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"login"} element={(userFirstName.length === 0) ? <Login /> :<Login />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"sign-up"} element={(userFirstName.length === 0) ? <Login /> :<SignUp />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"refer"} element={(userFirstName.length === 0) ? <Login /> :<ReferralRequestPosts />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"my_profile"} element={(userFirstName.length === 0) ? <Login /> :<Profile />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"create_job_post"} element={(userFirstName.length === 0) ? <Login /> :<CreateJobPost />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"view_job_posts"} element={(userFirstName.length === 0) ? <Login /> :<ViewJobPosts />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"your_job_posts"} element={(userFirstName.length === 0) ? <Login /> :<YourJobPosts />} />
            <Route path={(userFirstName.length === 0) ? "/login" :"your_applications"} element={(userFirstName.length === 0) ? <Login /> :<ViewAppliedJobPosts />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

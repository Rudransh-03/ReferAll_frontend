import './App.css';
import Header from './components/Header';
import Home from './components/HomePage/Home';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { RootState } from './store';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const userFirstName: string = useSelector((state: RootState) => state.user.firstName);

  // Redirect to login if the user is not authenticated
  return userFirstName.length === 0 ? <Navigate to="/login" replace /> : children;
  

}

function App() {
  const userCompanyName: string = useSelector((state: RootState) => state.user.currentCompany);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Protected Routes */}

            <Route
              path="/seek_referral"
              element={
                <ProtectedRoute>
                  <SeekReferral />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view_your_referrals"
              element={
                <ProtectedRoute>
                  <PeopleYouReferred />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view_requests"
              element={
                <ProtectedRoute>
                  <ViewRequests />
                </ProtectedRoute>
              }
            />

            {(userCompanyName !== "N/A") && 
              <Route
                path="/refer"
                element={
                  <ProtectedRoute>
                    <ReferralRequestPosts />
                  </ProtectedRoute>
                }
              />
            }
            <Route
              path="/my_profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create_job_post"
              element={
                <ProtectedRoute>
                  <CreateJobPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view_job_posts"
              element={
                <ProtectedRoute>
                  <ViewJobPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/your_job_posts"
              element={
                <ProtectedRoute>
                  <YourJobPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/your_applications"
              element={
                <ProtectedRoute>
                  <ViewAppliedJobPosts />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

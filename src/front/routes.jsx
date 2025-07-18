import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { InGame } from "./pages/InGame";
import { RankingPage } from "./pages/RankingPage";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import { EditProfile } from "./pages/EditProfile";
import { MyFriends } from "./pages/MyFriends";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/ranking/global"
        element={
          <PrivateRoute>
            <RankingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/game/classic-mode"
        element={
          <PrivateRoute>
            <InGame />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-friends"
        element={
          <PrivateRoute>
            <MyFriends />
          </PrivateRoute>
        }
      />
    </Route>

  )
);
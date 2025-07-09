// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { GameSelector } from "./pages/GameSelector";
import { AboutUs } from "./pages/AboutUs";
import { InGame } from "./pages/InGame";
import { RankingPage } from "./pages/RankingPage";
import MyProfile from "./pages/MyProfile";
import PrivateRoute from "./components/PrivateRoute";
import { CreateAvatar } from "./pages/CreateAvatar";

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
            <GameSelector />
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
        path="/profile"
        element={
          <PrivateRoute>
            <MyProfile />
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
        path="/avatar-creator"
        element={
          <PrivateRoute>
            <CreateAvatar/>
          </PrivateRoute>
        }
      />
    </Route>

  )
);
import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./config/appRoutes";
import type { RootState } from "./redux/reducers/rootReducers";
import {
  LOGIN_SUCCESS,
  AUTH_CHECK_COMPLETE,
} from "./redux/actions/actionTypes";

console.log(
  "%c Hi 👋! Welcome to Gonardweb! ",
  "background: #fff; color: #222; font-size: 18px; font-weight: bold; border: 2px dashed #222; padding: 8px;"
);

console.log(
  "%cMade with ♥ by Asutosh Mishra (Gonardweb) ",
  "background: #fff; color: #222; font-size: 16px; border: 2px dashed #222; padding: 8px;"
);

console.log(
  "%c\nGonard Web\n",
  "color: #fff; background: linear-gradient(90deg, #ff0080, #7928ca, #00ff80, #ffd700, #00bfff); font-size: 60px; font-weight: bold; text-shadow: 4px 4px 0 #00bfff, 8px 8px 0 #ff0080;"
);

console.log(new Date().toISOString());

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userString = localStorage.getItem("user");

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user, token, refreshToken: token },
        });
      } catch (error) {
        localStorage.clear();
        dispatch({ type: AUTH_CHECK_COMPLETE });
      }
    } else {
      dispatch({ type: AUTH_CHECK_COMPLETE });
    }
    setAuthChecked(true);
  }, [dispatch]);

  // Wait for auth check before rendering routes
  if (!authChecked || (loading && !isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000000]"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <AppRoutes isAuthenticated={isAuthenticated} />;
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
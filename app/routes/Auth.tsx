import { useEffect, useState } from "react";
import type { Route } from "./+types/Auth";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind │ Auth" }];
}

const Auth = () => {
  /* HANDLE LOADING */
  const [isLoading] = useState(false);

  /* HANDLE LOGIN LOGUT */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* handle redirection if user already logged in */
  const location = useLocation();
  const requestedPath = new URLSearchParams(location.search).get("next");
  const next =
    requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate(next);
  }, [isLoggedIn, navigate, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to continue Your job journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in</p>
              </button>
            ) : (
              <>
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="auth-button"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="auth-button"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;

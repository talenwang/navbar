import React, { useState, useEffect } from "react";
import { links } from "./root.helper.js";
import { Link, navigate } from "@reach/router";

import { auth$ as auth, logout } from "@react-mf/auth";

export default function Root(props) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const sub = auth.subscribe(({ sessionToken }) => {
      console.log(sessionToken);
      const needsLogin = !sessionToken;
      if (needsLogin) navigate("/login");
      else if (!needsLogin && window.location.pathname === "/login") {
        setIsLogin(true);
        navigate("/people");
      }
    });
    return () => {
      sub.unsubscribe();
      setIsLogin(false);
    };
  }, []);
  return isLogin ? (
    <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
      <div className="flex items-center justify-between">
        {links.map((link) => {
          return (
            <Link key={link.href} className="p-6" to={link.href}>
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <button
          class="action"
          type="button"
          onClick={() => {
            logout();
            setIsLogin(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
}

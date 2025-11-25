import { useState } from "react";
import { fetchAccountInfo } from "../http/article/login";
import { UserContext } from "./UserContext.jsx";

export default function UserContextProvider({ children }) {
  const [account, setAccount] = useState();

  const contextActions = {
    account,
    login() {
      (async () => {
        const userInfo = await fetchAccountInfo();
        setAccount(userInfo);
        // 내정보 불러오기 => 아무곳에서나 공유 가능
      })();
    },
    logout() {
      setAccount(undefined);
      localStorage.removeItem("_token_");
    }, // 토큰 지우기
  };

  return (
    <UserContext.Provider value={contextActions}>
      {children}
    </UserContext.Provider>
  );
}

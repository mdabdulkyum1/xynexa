"use client"; // ✅ Client Component

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import SyncUser from "@/hooks/SyncUser"; 

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SyncUser /> 
      {children}
    </Provider>
  );
}

// as

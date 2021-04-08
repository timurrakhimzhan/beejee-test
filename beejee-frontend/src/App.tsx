import React from 'react';
import AppRouter from "./app-router";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
  );
}

export default App;

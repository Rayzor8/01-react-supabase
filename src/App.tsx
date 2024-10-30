import { useState } from "react";
import { Button } from "./components/ui/button";
import Container from "./components/ui/container";
import supabase from "./config/supabase-client";

function App() {
  const [count, setCount] = useState(0);
  console.log(supabase);
  return (
    <Container>
      <Button size="lg" onClick={() => setCount((count) => count + 1)}>
        Test button
      </Button>
      <h1 className="text-3xl font-bold"> {count}</h1>
    </Container>
  );
}

export default App;

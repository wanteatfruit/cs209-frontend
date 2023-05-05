import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, ButtonGroup, Divider } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <div
          className="side-menu"
          style={{
            backgroundColor: "#2d3748",
            margin: "12px",
            borderRadius: "10px",
          }}
        >
          <div className="logo-sf" style={{ padding: "20px" }}>
            <img src={reactLogo} alt="react logo" />
          </div>
          <Divider />
          <div className="side-menu-item" style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'10%'}}>
            <ButtonGroup width={'100%'} justifyContent={'center'} isAttached>
              <Button width={'100%'}  variant='unstyled'>测使</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="main" style={{}}>
          test
        </div>
      </div>
    </>
  );
}

export default App;

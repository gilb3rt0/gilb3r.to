import { Canvas } from "@react-three/fiber";
import "./App.css";
import Portfolio from "./Portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <Canvas shadows>
        <Portfolio />
      </Canvas>
      <a href="mailto:hello@gilb3r.to" target={"_blank"}>
        <FontAwesomeIcon icon={faEnvelope} className="envelope" />
      </a>
    </>
  );
}

export default App;

import { Canvas } from "@react-three/fiber";
import "./App.css";
import Portfolio from "./Portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { OrthographicCamera } from "@react-three/drei";

function App() {
  
  
  return (
    <>
      <Canvas shadows>
        <OrthographicCamera
          makeDefault
          zoom={100}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 200]}
        />
        <Portfolio />
      </Canvas>
      <a href="mailto:hello@gilb3r.to" target={"_blank"}>
        <FontAwesomeIcon icon={faEnvelope} className="envelope" />
      </a>
    </>
  );
}

export default App;

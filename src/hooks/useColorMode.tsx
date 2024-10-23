import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "dark"); // Set initial color mode to "dark"

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    // Always set the body class to "dark"
    bodyClass.add(className);

    // No need to depend on colorMode here

    return () => {
      // Clean up: Remove the body class when the component unmounts
      bodyClass.remove(className);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return [colorMode, setColorMode];
};

export default useColorMode;

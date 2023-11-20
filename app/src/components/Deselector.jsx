/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const Deselector = ({ children, handleClickOutside }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    console.log("handleClickOutside:", handleClickOutside);
    console.log("handleClickOutside is undefined:", !handleClickOutside);

    function handleClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default Deselector;
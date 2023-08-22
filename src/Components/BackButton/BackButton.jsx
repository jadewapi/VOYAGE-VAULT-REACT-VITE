import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

function BackButton({ type }) {
  const navigate = useNavigate();
  return (
    <button
      className={`styles.button ${type}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      Back
    </button>
  );
}

export default BackButton;

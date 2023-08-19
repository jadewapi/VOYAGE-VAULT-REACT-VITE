import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

function Form() {
  return (
    <div className={styles.formContainer}>
      <p>🇵🇭 Philippines</p>
      <form className={styles.form}>
        <label>City name:</label>
        <input type="text" value="sevila" />
        <label>When did you go to Sevilla</label>
        <input type="text" value="sevila" />
        <label>Notes about Sevilla</label>
        <textarea className={styles.textArea}>sdf</textarea>
        <div className={styles.buttons}>
          <Button>Add</Button>
          <Button>Back</Button>
        </div>
      </form>
    </div>
  );
}

function Button({ children }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {children}
    </button>
  );
}

export default Form;

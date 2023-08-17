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
          <button>Add</button>
          <button>Back</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

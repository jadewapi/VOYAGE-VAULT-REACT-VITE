import styles from "./UserLogged.module.css";

function UserLogged() {
  return (
    <div className={styles.container}>
      <div>
        <img src="https://i.pravatar.cc/300" alt="" />
        <div>
          <p>Welcome</p>
          <p>Jade Pineda</p>
        </div>
      </div>
      <button>Logout</button>
    </div>
  );
}

export default UserLogged;

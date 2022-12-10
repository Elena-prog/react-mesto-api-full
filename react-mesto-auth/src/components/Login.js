import React from "react";

export default function Login({ onLogin }) {
  const [values, setValues] = React.useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.password, values.email).finally(() => {
      setValues({ email: "", password: "" });
    });
  }

  return (
    <form className="entry" onSubmit={handleSubmit}>
      <h3 className="entry__title">Вход</h3>
      <input
        value={values.email}
        name="email"
        type="email"
        className="entry__input entry__input_type_email"
        required
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        value={values.password}
        name="password"
        type="password"
        className="entry__input entry__input_type_password"
        required
        placeholder="Пароль"
        onChange={handleChange}
      />
      <button className="entry__submit-button" type="submit">
        Войти
      </button>
    </form>
  );
}

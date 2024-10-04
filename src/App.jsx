import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("inside post response", data);
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };
  return (
    <>
      <h1>User Management System</h1>
      <form onSubmit={handleAddUser}>
        <input
          className="block bg-white h-12 rounded-xl border-black border-[1px] mb-5 w-1/2 mx-auto mt-6"
          type="text"
          name="name"
          placeholder="Enter Username"
        />
        <input
          className="block bg-white h-12 rounded-xl border-black border-[1px] mb-5 w-1/2 mx-auto"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <input
          className="bg-green-400 btn text-white"
          type="submit"
          value="Submit"
        />
      </form>
      <h3>Number of Users:{users.length}</h3>
      {users.map((user) => (
        <div
          key={user.id}
          className="border-[1px] border-red-500 rounded-2xl mb-5"
        >
          <h3>Id: {user.id}</h3>
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
        </div>
      ))}
    </>
  );
}

export default App;

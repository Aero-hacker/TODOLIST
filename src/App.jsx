import { useEffect, useState } from "react";
//import { useRef } from "react";

function App() {
  const [todos, settodos] = useState("");
  const [items, setitems] = useState([]);
  const [edit, setedit] = useState("");
  const [opendialog, setopendialog] = useState(false);

  function todo(e) {
    settodos(e.target.value);
  }

  function clicktodo() {
    if (todos == "") return;
    const newitem = {
      name: todos,
      id: crypto.randomUUID(),
      completed: false,
    };
    setitems(() => {
      localStorage.setItem("todo", JSON.stringify([...items, newitem]));
      return [...items, newitem];
    });
    settodos("");
  }

  function togglecheck(id) {
    let newitems = items.map((item) => {
      if (item.id == id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setitems(newitems);
    localStorage.setItem("todo", JSON.stringify(newitems));
  }

  function deletetodo(id) {
    let filteredarr = items.filter((item) => {
      if (item.id != id) {
        return item;
      }
    });
    setitems(filteredarr);
    localStorage.setItem("todo", JSON.stringify(filteredarr));
  }

  function edittodo(id, name) {
    setopendialog(!opendialog);
    // let newitem = items.find((item) => {
    //   if (item.id == id) return item;
    // });
    setedit({ id, name });
  }

  useEffect(() => {
    let storeditems = localStorage.getItem("todo");
    let parseditems = JSON.parse(storeditems);
    setitems(parseditems);
  },[]);

  return (
    <div className="main">
      <div className="maincont1">
        <h1>
          <span className="head1">TO</span>
          <span className="head2">DO</span>
        </h1>
      </div>
      <div className="maincont2">
        <div className="todocontainer">
          <div className="subcont1">
            <div className="input1">
              <input
                type="text"
                onChange={todo}
                className="todo"
                value={todos}
              />
              <button className="todobtn" onClick={clicktodo}>
                TODO
              </button>
            </div>
            <br />
            <div className="input2">
              <input type="text" className="searchbar" />
              <button className="searchbtn">Search</button>
            </div>
          </div>
        </div>
        <div className="lastcont">
          <div className="subcont2">
            {items.map((item) => (
              <div key={item.id} className="item">
                <div className="itemcont1">
                  <input
                    defaultChecked={item.completed}
                    onClick={() => togglecheck(item.id)}
                    type="checkbox"
                  />
                  <div className={`${item.completed ? "completed" : ""}`}>
                    {item.name}
                  </div>
                </div>
                <svg
                  onClick={() => deletetodo(item.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
                <button
                  className="editbtn"
                  onClick={() => edittodo(item.id, item.name)}
                >
                  edit
                </button>
                <dialog open={opendialog}>
                  <input
                    type="text"
                    onChange={(e) =>
                      setedit((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                    value={edit.name}
                  />
                  <button
                    onClick={() => {
                      let newarr = items.map((item) => {
                        if (item.id == edit.id) {
                          item.name = edit.name;
                        }
                        return item;
                      });
                      setitems(newarr);
                      setopendialog(false);
                      localStorage.setItem("todo", JSON.stringify(newarr));
                    }}
                  >
                    save
                  </button>
                </dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

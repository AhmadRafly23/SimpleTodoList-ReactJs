// const root = document.querySelector("#root");
// function PanggilNama(props) {
//   return <h1>Namaku adalah {props.name}</h1>;
// }
// const element = <PanggilNama name="Rafly" />;
// ReactDOM.render(element, root);
const root = document.getElementById("root"); // function Tick() {
//   const element = (
//     <div>
//       <h1 className="heading" style={{ color: "blue" }}>
//         Jam Sekarang
//       </h1>
//       <h2>{new Date().toLocaleTimeString()}</h2>
//     </div>
//   );
//   ReactDOM.render(element, root);
// }
// setInterval(function () {
//   Tick();
// }, 1000);

function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState("");

  function saatDiKlik(e) {
    e.preventDefault();
    setMessage("");

    if (!activity) {
      return setMessage("Jangan Kosong");
    }

    if (edit.id) {
      const updateTodo = { ...edit,
        activity: activity
      };
      const editFindIndex = todos.findIndex(todo => {
        return todo.id == edit.id;
      });
      const updateTodos = [...todos];
      updateTodos[editFindIndex] = updateTodo;
      setTodos(updateTodos);
      return cancelHandler();
    }

    setTodos([...todos, {
      id: generateId(),
      activity: activity,
      status: false
    }]);
    setActivity("");
  }

  function generateId() {
    return Date.now();
  }

  function hapusTodos(itemId) {
    const filterTodos = todos.filter(todo => {
      return itemId !== todo.id;
    });
    setTodos(filterTodos);
    if (edit.id) cancelHandler();
  }

  function editTodos(ids) {
    setActivity(ids.activity);
    setEdit(ids);
  }

  function cancelHandler() {
    setActivity("");
    setEdit({});
  }

  function ceklistHandler(cek) {
    const updatedCeklist = { ...cek,
      status: cek.status ? false : true
    };
    const editFindIndex = todos.findIndex(currentTodo => {
      return currentTodo.id == cek.id;
    });
    const updateTodos = [...todos];
    updateTodos[editFindIndex] = updatedCeklist;
    setTodos(updateTodos);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Kegiatan Hari Ini"), message && /*#__PURE__*/React.createElement("div", null, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: saatDiKlik
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: activity,
    onChange: e => {
      setActivity(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Simpan perubahan" : "Add +"), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelHandler
  }, "Cancel edit")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(item => {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      onChange: ceklistHandler.bind(this, item),
      checked: item.status
    }), item.activity, item.status ? "selesai" : "belum selesai", /*#__PURE__*/React.createElement("button", {
      onClick: editTodos.bind(this, item)
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      onClick: hapusTodos.bind(this, item.id)
    }, "Hapus"));
  })) : /*#__PURE__*/React.createElement("i", null, "Tidak ada todo"));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);
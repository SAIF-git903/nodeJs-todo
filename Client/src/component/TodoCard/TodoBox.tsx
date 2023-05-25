import React from "react";
import TaskCard from "../TaskCard";
import { getUserForAssigning } from "../../api/axiosConfig";
import { Dropdown, MenuProps } from "antd";
import axios from "axios";

interface TodoBoxProps {
  title: string;
}

function TodoBox(props: TodoBoxProps) {
  const [isPlusClicked, setPlusClicked] = React.useState<boolean>(false);
  const [inputVal, SetInput] = React.useState<string>("");
  const [apiUser, setApiUser] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [addedTasks, setAddedTasks] = React.useState<any[]>([]);

  const { title } = props;

  async function handlePostRequest() {
    const url = "http://localhost:5000";

    const postData = {
      taskBody: inputVal,
      user: selectedUser,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(async (response) => {
        if (response.ok) {
          // Request was successful
          console.log("POST request successful");
          // Handle response data if needed
        } else {
          // Request was not successful
          console.log("POST request failed");
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        SetInput("");
        setSelectedUser(null);
        // Handle error if needed
      });
    SetInput("");
    setSelectedUser(null);
    // code change
  }

  function getPostedTasks() {
    fetch("http://localhost:5000/tasks")
      .then(async (response) => {
        if (response.ok) {
          let data = await response.json(); // Parse the response body as JSON
          setAddedTasks(data);
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.log(error); // Handle any errors here
      });
  }

  const fetchData = async () => {
    try {
      const response = await getUserForAssigning();
      setApiUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const dropdownItems: MenuProps["items"] = apiUser.map((user) => ({
    label: user.name,
    key: user.id,
    onClick: () => setSelectedUser(user), // Set the selected user when an item is clicked
  }));

  React.useEffect(() => {
    getPostedTasks();
  }, [addedTasks]);

  console.log(addedTasks, "addedTasks");

  return (
    <div className="centered-anything new-box">
      <div className="todo-main-container">
        <div className="todo-card-box flex-row show-heading-hover-effect">
          <p className="todo-card-heading">{title}</p>
          <p>0</p>

          <div
            className="img-plus-div"
            onClick={() => setPlusClicked(!isPlusClicked)}
          >
            <img
              src={require("../../assets/icons/Plus.svg").default}
              style={{ width: "20px" }}
              alt="mySvgImage"
            />
          </div>
        </div>
        {isPlusClicked && (
          <>
            <div className="new-task-assign-div">
              <input
                type="text"
                placeholder="Assign new todo..."
                onChange={(e) => SetInput(e.target.value)}
                value={inputVal}
              />
              <div
                className="close-icon"
                onClick={() => {
                  setPlusClicked(false);
                  setSelectedUser(null);
                }}
              >
                <img
                  src={require("../../assets/icons/Close.svg").default}
                  style={{ width: "20px" }}
                  alt="mySvgImage"
                />
              </div>
              <div className="user-icon">
                <Dropdown
                  menu={{ items: dropdownItems }}
                  trigger={["click"]}
                  overlayStyle={{ width: "200px" }}
                >
                  {selectedUser ? (
                    <img
                      src={require("../../assets/icons/User.svg").default}
                      style={{ width: "20px" }}
                      alt="mySvgImage"
                      className="selected-user-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/icons/Add_User.svg").default}
                      style={{ width: "20px" }}
                      alt="mySvgImage"
                    />
                  )}
                </Dropdown>
              </div>

              <div className="save-btn">
                <span onClick={handlePostRequest}>Save</span>
              </div>
            </div>
          </>
        )}
        <div className="todo-taskimage src-div">
          {addedTasks.map((task) => {
            return <TaskCard task={task} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoBox;


// changed
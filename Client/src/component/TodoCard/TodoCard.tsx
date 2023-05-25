  import React from "react";
  import TodoBox from "./TodoBox";
  import "./style.scss";

  function TodoCard() {
    return (
      <div>
        <h2 className="centered-anything">
          Todo <span className="span-bg-st">Node</span> Js{" "}
        </h2>
        
        <TodoBox title={"Todo"}/>
      </div>
    );
  }

  export default TodoCard;

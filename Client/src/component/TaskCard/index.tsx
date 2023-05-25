import React from "react";
import "./style.scss";

interface TaskCardProps {
  task: {
    taskBody: string;
    taskUser: null | {};
  };
}

function TaskCard(props: TaskCardProps) {
  return (
    <div className="task-container">
      <p>{props.task.taskBody}</p>
    </div>
  );
}

export default TaskCard;

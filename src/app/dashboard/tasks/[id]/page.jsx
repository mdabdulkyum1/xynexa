'use client'
import React from "react";
import TaskHeading from "../components/TaskHeading";
import TaskControl from "../components/TaskControl";
import TaskBoard from "../components/TaskBoard ";
import { useParams } from "next/navigation";
import { useGetTeamQuery } from "@/redux/features/Api/teamApi";
import { useGetBoardByTeamIdQuery } from "@/redux/features/Api/TaskApi";





const TaskSingleBoard = () => {
    const { id: teamId } = useParams();
    const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId);

    const { data: allTasks, isLoading: taskLoading , isError : taskIsError, error: task } = useGetBoardByTeamIdQuery(teamId);
    
  return (
    <div>
      <TaskHeading team={team}/>
      <TaskControl team={team}></TaskControl>
      <TaskBoard 
      team={team}
      allTasks={allTasks}
      teamId={teamId}
      ></TaskBoard>
    </div>
  );
};

export default TaskSingleBoard;

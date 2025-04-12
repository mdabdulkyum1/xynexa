'use client'
import React from "react";
import TaskHeading from "../components/TaskHeading";
import TaskControl from "../components/TaskControl";
import TaskBoard from "../components/TaskBoard ";
import { useParams } from "next/navigation";
import { useGetTeamQuery } from "@/redux/features/Api/teamApi";


const TaskSingleBoard = () => {
    const { id: teamId } = useParams();
    const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId);
    console.log(team);
    
  return (
    <div>
      <TaskHeading team={team}/>
      <TaskControl team={team}></TaskControl>
      <TaskBoard team={team}></TaskBoard>
    </div>
  );
};

export default TaskSingleBoard;

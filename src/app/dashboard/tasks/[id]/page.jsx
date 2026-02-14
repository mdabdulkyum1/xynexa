'use client'
import React from "react";
import TaskHeading from "../components/TaskHeading";
import TaskControl from "../components/TaskControl";
import TaskBoard from "../components/TaskBoard ";
import useTeamStore from "@/store/useTeamStore";
import useBoardStore from "@/store/useBoardStore";
import { useEffect } from "react";
import { useParams } from "next/navigation";





const TaskSingleBoard = () => {
    const { id: teamId } = useParams();
    const { teams, currentTeam, setCurrentTeam } = useTeamStore();
    const { boards: allTasks, fetchBoardsByTeamId, isLoading: taskLoading } = useBoardStore();

    useEffect(() => {
        if (teamId) {
            fetchBoardsByTeamId(teamId);
            const team = teams.find(t => t.id === teamId || t._id === teamId);
            if (team) setCurrentTeam(team);
        }
    }, [teamId, fetchBoardsByTeamId, teams, setCurrentTeam]);

    const team = currentTeam;
    
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

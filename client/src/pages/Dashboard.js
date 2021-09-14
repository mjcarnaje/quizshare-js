import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardNavigation from "../components/DashboardNavigation";
import MyProfile from "./MyProfile";
import MyQuizzes from "./MyQuizzes";

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/dashboard/profile");
  }, [history]);
  return (
    <Box w="full" minH="100vh">
      <DashboardHeader />
      <Grid
        px={{ base: "10px", md: "32px" }}
        maxW="1100px"
        py="24px"
        templateColumns={{ base: "1fr", lg: "1fr 3fr" }}
        gap="10px"
        mx="auto"
      >
        <DashboardNavigation />
        <Switch>
          <Route exact path="/dashboard/profile" component={MyProfile} />
          <Route exact path="/dashboard/quizzes" component={MyQuizzes} />
        </Switch>
      </Grid>
    </Box>
  );
};

export default Dashboard;

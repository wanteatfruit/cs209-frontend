import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BsGithub, BsStackOverflow } from "react-icons/bs";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Icon,
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function App() {
  const [avgAnswers, setAvgAnswers] = useState(0);
  const [Unanswered, setUnanswered] = useState(0);
  const [maxAnswers, setMaxAnswers] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/questions/getall").then((res) => {
      console.log(res.data);
      setAllQuestions(res.data);
    });
    axios
      .get("http://localhost:9090/questions/get-average-answer-count")
      .then((res) => {
        setAvgAnswers(res.data);
      });
    axios
      .get("http://localhost:9090/questions/get-max-answer-count")
      .then((res) => {
        setMaxAnswers(res.data);
      });
    axios
      .get("http://localhost:9090/questions/get-unanswered-count")
      .then((res) => {
        setUnanswered(res.data);
      });
  }, []);
  return (
    <>
      <div className="app font-sans">
        <div
          className="side-menu"
          style={{
            backgroundColor: "#2d3748",
            margin: "12px",
            borderRadius: "10px",
          }}
        >
          <div className=" px-10 py-8 flex justify-between">
            <Icon mt={1} as={BsStackOverflow} w={10} h={10} color="orange" />
            <div>
            <p className="text-white text-lg font-semibold ">StackOverflow</p>
            <p className="text-white decoration-wavy font-semibold">Visualization👀</p>

            </div>
          </div>
          <Divider />
          <div
            className="side-menu-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            <button className="bg-sky-500 p-4 rounded-md w-5/6  text-white hover:bg-sky-600 ">
              Dashboard
            </button>
            {/* <button className="bg">Question</button> */}
          </div>
        </div>
        <div className="main" style={{ margin: "12px" }}>
          <header className="pb-4 p-4 pr-10 flex justify-between">
            <div>
            <h1>Dashboard</h1>
            <p>
              Date range: {dayjs.unix(1221225856).format("YYYY/MM/DD")} -{" "}
              {dayjs.unix(1682602397).format("YYYY/MM/DD")}
            </p>
            </div>
            <IconButton
              variant={"ghost"}
              _hover={{ bgColor: "none" }}
              icon={<BsGithub size={"lg"} />}
              size="lg"
              m={0}
              p={0}
            />

          </header>
          <Divider p={0} m={0} />
          <div className="flex-col space-y-4 px-8 py-10">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <Stat
                bgColor={"white"}
                borderRadius={"12px"}
                pt={5}
                py={4}
                pl={4}
              >
                <StatLabel>Questions Collected</StatLabel>
                <StatNumber>{allQuestions.length}</StatNumber>
              </Stat>
              <Stat bgColor={"white"} borderRadius={"12px"} pt={5} pl={4}>
                <StatLabel>Unanswered Questions</StatLabel>
                <StatNumber> {Unanswered} </StatNumber>
              </Stat>
              <Stat bgColor={"white"} borderRadius={"12px"} py={5} pl={4}>
                <StatLabel>Average #Answers</StatLabel>
                <StatNumber>{avgAnswers}</StatNumber>
              </Stat>
              <Stat bgColor={"white"} borderRadius={"12px"} py={5} pl={4}>
                <StatLabel>Maximum Answer Count</StatLabel>
                <StatNumber>{maxAnswers}</StatNumber>
              </Stat>
            </div>
            <div className="grid gap-4 grid-cols-1">
              <div className="bg-white rounded-lg py-4 pr-8" >
                <h2 className="ml-10 text-xl mb-4">Answer Distribution Chart</h2>
                <ResponsiveContainer height={300} width={"100%"}>
                  <LineChart data={allQuestions} width={'100%'} height={500} >
                    <XAxis dataKey="questionId" />
                    <YAxis />
                    <Line type="monotone" dataKey="answerCount" stroke="#8884d8" />

                  </LineChart>
                </ResponsiveContainer>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

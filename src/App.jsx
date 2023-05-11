import { useEffect, useState } from "react";
import "./App.css";
import { BsGithub, BsStackOverflow } from "react-icons/bs";
import {
  Divider,
  Icon,
  IconButton,
  SkeletonText,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import QuestionDistribution from "./components/QuestionDistribution";
import AcceptedAnswerPie from "./components/AcceptedAnswerPie";
import AnswerCountPie from "./components/AnswerCountPie";
import TagCloud from "./components/TagWordCloud";
import QuestionTable from "./components/QuestionTable";
import ResolutionTime from "./components/ResolutionTime";
import TopTenClasses from "./components/TopTenClasses";
import { codeData } from "./assets/codeData";
import { parseAllTree, parseThreeLevelTree } from "./assets/parseTree";
import ImportSunBlast from "./components/ImportSunblast";
import ImportTreeMap from "./components/ImportTreeMap";
import TopTenAnnotations from "./components/TopTenAnnotations";
import hljs from "highlight.js";
import Highlight from "react-highlight";
const CARDBG = "bg-white rounded-lg py-4 pr-8";
const SELECTED = " bg-orange-400 w-5/6 text-white p-3 rounded-md";
const UNSELECTED = "text-white p-3 rounded-md w-5/6 hover:bg-gray-600";
function App() {
  const [avgAnswers, setAvgAnswers] = useState(0);
  const [Unanswered, setUnanswered] = useState(0);
  const [maxAnswer, setMaxAnswer] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [acceptedQuestion, setAcceptedQuestion] = useState([]);
  const [resolutionTimes, setResolutionTimes] = useState([]);
  const [tagCount, setTagCount] = useState([]);
  const [answerDistribution, setAnswerDistribution] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getall = axios.get("http://localhost:9090/questions/getall");
    const getavg = axios.get(
      "http://localhost:9090/questions/get-average-answer-count"
    );
    const getmax = axios.get(
      "http://localhost:9090/questions/get-max-answer-question"
    );
    const getunans = axios.get(
      "http://localhost:9090/questions/get-unanswered-count"
    );
    const getanscntdist = axios.get(
      "http://localhost:9090/questions/get-answer-count-distribution"
    );
    const getacceptedquestion = axios.get(
      "http://localhost:9090/questions/get-accepted-questions"
    );
    const gettagcount = axios.get("http://localhost:9090/tags/count");
    const getresolution = axios.get(
      "http://localhost:9090/answers/get-resolution-time"
    );

    axios
      .all([
        getall,
        getavg,
        getmax,
        getunans,
        getanscntdist,
        getacceptedquestion,
        gettagcount,
        getresolution,
      ])
      .then(
        axios.spread((...allData) => {
          console.log(allData[0].data);
          setAllQuestions(allData[0].data);
          setAvgAnswers(allData[1].data);
          setMaxAnswer(allData[2].data);
          setUnanswered(allData[3].data);
          setAnswerDistribution(allData[4].data);
          setAcceptedQuestion(allData[5].data);
          setTagCount(allData[6].data);
          setResolutionTimes(allData[7].data);
          setLoading(false);
        })
      )
      .catch((err) => console.log(err));


  }, []);
  return (
    <>
      <head></head>

      <div className="grid grid-cols-10 w-full m-auto  font-sans bg-slate-50 ">
        <div
          className=" m-4 col-span-2  bg-blue-900 rounded-2xl"
        >
          <div className=" px-10 py-8 flex justify-between">
            <Icon
              mt={1}
              as={BsStackOverflow}
              w={10}
              h={10}
              color="orange.300"
            />
            <div>
              <p className="text-white text-lg font-semibold ">StackOverflow</p>
              <p className="text-white decoration-wavy font-semibold">
                Visualization👀
              </p>
            </div>
          </div>
          <Divider />
          <div
            className="side-menu-item space-y-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            {window.location.pathname == "/" ? (
              <a href="/" className={SELECTED}>
                Dashboard
              </a>
            ) : (
              <a href="/" className={UNSELECTED}>
                Dashboard
              </a>
            )}
            {window.location.pathname == "/question" ? (
              <a href="/question" className={SELECTED}>
                Question
              </a>
            ) : (
              <a href="/question" className={UNSELECTED}>
                Question
              </a>
            )}
            {window.location.pathname == "/answer" ? (
              <a href="/answer" className={SELECTED}>
                Answers
              </a>
            ) : (
              <a href="/answer" className={UNSELECTED}>
                Answers
              </a>
            )}
            {window.location.pathname == "/code" ? (
              <a href="/code" className={SELECTED}>
                Code Analysis
              </a>
            ) : (
              <a href="/code" className={UNSELECTED}>
                Code Analysis
              </a>
            )}
          </div>
        </div>

        <div className="main col-span-8" style={{ margin: "12px" }}>
          <header className="pb-4 p-4 pr-10 flex justify-between">
            <div>
              <h1>{window.location.pathname}</h1>
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
          <SkeletonText isLoaded={!loading}>
            <div className="flex-col space-y-4 px-8 py-10">
              {window.location.pathname == "/" && (
                <>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    <Stat bgColor={"white"} borderRadius={"12px"} pt={5} pl={4}>
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
                      <StatNumber>{maxAnswer.answerCount}</StatNumber>
                    </Stat>
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div className={CARDBG}>
                      <div className="w-full h-96">
                        <TagCloud wordCloudData={tagCount} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {window.location.pathname == "/question" && (
                <div className="grid gap-4 grid-rows-3">
                  <div className="grid gap-4 grid-cols-1">
                    <div className="bg-white rounded-xl shadow-md  ">
                      <div className="chart w-full h-96 mt-8" style={{}}>
                        <QuestionDistribution
                          questions={getAverageByDate(allQuestions)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-3">
                    <div className="bg-white rounded-xl col-span-2 shadow-md">
                      <div className="w-full h-96 mt-8">
                        <ResolutionTime
                          data={parseResolution(resolutionTimes)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 grid-rows-3">
                      <Stat className="bg-white rounded-lg shadow-md p-4 pt-6">
                        <StatLabel>Average Resolution Time</StatLabel>
                        <StatNumber>23 Minutes</StatNumber>
                        <StatHelpText>Have a meal and come back</StatHelpText>
                      </Stat>
                      <a href="https://stackoverflow.com/questions/141284/the-difference-between-the-runnable-and-callable-interfaces-in-java">
                        <Stat className="bg-white rounded-lg shadow-md p-4  hover:bg-slate-100 transition-colors">
                          <StatLabel>Fastest Resolution</StatLabel>
                          <StatNumber>2 Minutes</StatNumber>
                          <StatHelpText>
                            The difference between the Runnable and Callable
                            interfaces in Java?
                          </StatHelpText>
                        </Stat>
                      </a>
                      <a href="https://stackoverflow.com/questions/4052840/most-efficient-way-to-make-the-first-character-of-a-string-lower-case">
                        <Stat className="bg-white rounded-lg shadow-md p-4 hover:bg-slate-100 transition-colors">
                          <StatLabel>Slowest Resolution</StatLabel>
                          <StatNumber>5 Years</StatNumber>
                          <StatHelpText>
                            Most efficient way to make the first character of a
                            String lower case?
                          </StatHelpText>
                        </Stat>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {window.location.pathname == "/answer" && (
                <>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="bg-white rounded-lg py-6">
                      <div className="w-full h-96">
                        <AcceptedAnswerPie />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg py-6">
                      <div className="w-full h-96">
                        <AnswerCountPie data={answerDistribution} />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-3 ">
                    <div className="bg-white rounded-lg py-6 col-span-2">
                      <div className="w-full h-96"></div>
                    </div>
                  </div>
                </>
              )}
              {window.location.pathname == "/code" && (
                <SkeletonText isLoaded={!loading}>
                  <div className="grid gap-4 grid-rows-3">
                    <div className="grid gap-4 grid-cols-1">
                      <div className="bg-white rounded-xl shadow-md  ">
                        <div className="w-full h-96 mt-8 ">
                          <TopTenClasses
                            data={codeData.classNames.slice(0, 15)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1">
                      <div className="bg-white rounded-lg py-6">
                        <div className="w-full h-96">
                          <ImportTreeMap
                            importData={parseAllTree(codeData.importNames)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-3">
                      <div className="bg-white rounded-lg py-6 col-span-2">
                        <div className="w-full h-96">
                          <ImportSunBlast
                            importData={parseThreeLevelTree(
                              codeData.importNames
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-span-1 bg-white p-6 rounded-lg">
                        <div className=" text-center font-bold text-xl">
                          Most Frequently Used Method
                        </div>
                        <div className="code">
                          {codeData.methodNames.slice(0, 10).map((item) => (
                            <code key={item.name}>
                              {item.name + "()"}
                              <br></br>
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SkeletonText>
              )}
            </div>
          </SkeletonText>
        </div>
      </div>
    </>
  );
}

function parseResolution(data) {
  let resolutionTime = [
    { range: "Day", count: 0 },
    { range: "Week", count: 0 },
    { range: "Month", count: 0 },
    { range: "Year", count: 0 },
    { range: "More than a year", count: 0 },
  ];
  let shortest = 10000000;
  let longest = 0;
  let total = 0;
  data.forEach((q) => {
    let qDate = dayjs.unix(q.questionCreationDate);
    let aDate = dayjs.unix(q.answerCreationDate);
    let diff = aDate.diff(qDate, "day");
    let minuteDiff = aDate.diff(qDate, "minute");
    let yearDiff = aDate.diff(qDate, "year");
    total += diff;
    if (diff <= 1) {
      resolutionTime[0].count++;
      if (minuteDiff < shortest && minuteDiff != 0) {
        shortest = minuteDiff;
      }
    } else if (diff <= 7) {
      resolutionTime[1].count++;
    } else if (diff <= 30) {
      resolutionTime[2].count++;
    } else if (diff <= 365) {
      resolutionTime[3].count++;
    } else {
      resolutionTime[4].count++;
      if (yearDiff > longest) {
        longest = yearDiff;
      }
    }
  });
  const average = total / data.length;
  return resolutionTime;
}

function getAverageByDate(questions) {
  let questions_copy = JSON.parse(JSON.stringify(questions));
  questions_copy.forEach((q) => {
    q.creationDate = dayjs.unix(q.creationDate).format("YYYY/MM/DD");
  });
  const sum = questions_copy.reduce((creationDate, answerCount) => {
    creationDate[answerCount.creationDate] =
      (creationDate[answerCount.creationDate] || 0) + answerCount.answerCount ||
      1;
    return creationDate;
  }, {});
  const count = {};
  questions_copy.forEach((x) => {
    count[x.creationDate] = (count[x.creationDate] || 0) + 1;
  });
  const average = {};
  Object.keys(sum).forEach((x) => {
    average[x] = sum[x] / count[x];
  });
  return average;
}

export default App;

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function QuestionTable({ questions }) {
  return (
    <div className="h-full w-full rounded-lg bg-white p-4">
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDoubleDown />}>
          Filter
        </MenuButton>
        <MenuList>
          <MenuItem>Accepted Answer</MenuItem>
        </MenuList>
      </Menu>
      <TableContainer fontFamily={"Poppins"}>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Answer Status</Th>
              <Th>Answer Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((question) => (
              <Tr key={question.id}>
                
                <Td>{question.isAnswered ? "Answered" : "Unanswered"}</Td>
                <Td>{question.answerCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

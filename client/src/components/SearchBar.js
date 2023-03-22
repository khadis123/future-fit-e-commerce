import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const SearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [itemSuggestion, setItemSuggestion] = useState([]);
  const [compSuggestion, setCompSuggestion] = useState([]);

//   useEffect(() => {
//     fetch("/getItems")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);

//         setItemSuggestion(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     fetch("/companies")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setCompSuggestion(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

  return (
    <Wrapper>
      <div>
        <Input
          type="text"
          value={userInput}
          onChange={(ev) => setUserInput(ev.target.value)}
          onKeyDown={(ev) => {
            // if (ev.key === "Enter") {
            //   handleSelect(ev.target.useInput);
            // }
          }}
        />
        <Button onClick={() => setUserInput("")}>
          <BsSearch />
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0px 0px 0px 10px;
  border: 1px solid grey;

  &:focus {
    border: 2px solid green;
  }
`;

const Input = styled.input`
  width: 250px;
  border-radius: 5px;
  border: 1px solid grey;

  &:focus {
    border: 4px solid rgb(68, 140, 255);
  }
`;

export default SearchBar;

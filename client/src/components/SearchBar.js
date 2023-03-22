import { useState } from "react"
import styled from "styled-components";
const items = require("./data/items.json");
const companies = require("./data/companies.json");

const mergedData = items.concat(companies);
const SearchBar = () => {

const [userInput, setUserInput]= useState("");
const [suggestion, setSuggestion] = useState([]);


const matchedSuggestions = mergedData.filter((data)=> {
return(
    data.name.toLowerCase().includes(userInput.toLowerCase()) && userInput.length>=1
);

});
return(
<Wrapper>
<Container>
        <Input
          type="text"
          value={userInput}
          onChange={(ev) => setUserInput(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSelect(ev.target.useInput);
            }
          }}
        />
        <Button onClick={() => setUserInput("")}>Clear</Button>
      </Container>

</Wrapper>
)
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border-radius: 5px;
  padding: 5px 20px;
  margin: 0px 0px 0px 10px;
  border: 1px solid grey;

  &:focus {
    border: 2px solid rgb(68, 140, 255);
  }
`;
const Input = styled.input`
  width: 400px;
  border-radius: 5px;
  border: 1px solid grey;

  &:focus {
    border: 4px solid rgb(68, 140, 255);
  }

export default SearchBar
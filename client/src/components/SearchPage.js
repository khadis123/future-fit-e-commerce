import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiLoader, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

//SearchPage component that is a page only for searching product.
//it as the same logic as the SearchBar.js, but this one is bigger, cleaner and easier for the user to use.
const SearchPage = () => {
  const [userInput, setUserInput] = useState("");
  const [itemSuggestion, setItemSuggestion] = useState([]);

  const navigate = useNavigate();

  //Fetching all of the items.
  useEffect(() => {
    fetch("/getItems")
      .then((res) => res.json())
      .then((data) => {
        setItemSuggestion(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInput]);

  //if the itemsSuggestions === to the userInput. We only want the 10 first suggestions.
  const matchedSuggestions =
    itemSuggestion &&
    itemSuggestion.filter((suggestion) => {
      return (
        suggestion.name.toLowerCase().includes(userInput.toLowerCase()) &&
        userInput.length >= 2
      );
    });

  //Navigate to the selected item in the suggestion according to its _id
  // set the input to ""
  // Remove the itemsSuggestion since there's no more input.
  const navigateSuggestions = (_id) => {
    navigate(`/items/${_id}`);
    setItemSuggestion([]);
    setUserInput("");
  };
  return (
    <Wrapper>
      <H1>What are you looking for ?</H1>
      <Container>
        <Input
          type="text"
          value={userInput}
          onChange={(ev) => setUserInput(ev.target.value)}
        />
        <Button>
          <FiSearch />
        </Button>
      </Container>

      <Results>
        {!itemSuggestion ? (
          <LoadingIcon>
            <FiLoader />
          </LoadingIcon>
        ) : (
          matchedSuggestions.map((suggestion) => {
            const indexTitle = suggestion.name
              .toLowerCase()
              .indexOf(userInput.toLowerCase());
            const firstHalf = suggestion.name.slice(
              0,
              indexTitle + userInput.length
            );
            const secondHalf = suggestion.name.slice(
              indexTitle + userInput.length
            );

            return (
              <Suggestion
                key={suggestion._id}
                onClick={() => navigateSuggestions(matchedSuggestions[0]._id)}
              >
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf}</Prediction>
                </span>{" "}
              </Suggestion>
            );
          })
        )}
      </Results>
    </Wrapper>
  );
};
const H1 = styled.h1`
  text-align: center;
  padding: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
  height: 80vh;
`;

const Button = styled.span`
  color: black;
  border-radius: 5px;
  padding: 5px;
  margin: 0px 0px 0px 10px;
`;

const Results = styled.ul`
  position: absolute;
  top: 20%;
  left: 30%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 1;
  background-color: white;
  opacity: 90%;
  width: 730px;
  overflow-y: scroll;
  max-height: 60vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Suggestion = styled.li`
  padding: 6px;
  list-style-type: none;
  margin: 15px;

  &:hover {
    cursor: pointer;
    background-color: #d4ff8a;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  width: 500px;
  border-radius: 5px;
  border: 1px solid grey;
  height: 40px;
  font-size: 20px;

  &:focus {
    border: 4px solid rgb(68, 140, 255);
  }
`;

const Prediction = styled.span`
  font-weight: bold;
  color: black;
`;

const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 80vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SearchPage;

import styled from "styled-components";

//Sidebar component for the user to sort our items
const Sidebar = ({ setSort }) => {
  //When the user chooses a certain value, we render the filter method he chose
  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Select name={"Sort by..."} onChange={(e) => handleChange(e)}>
          <option value={"noSortState"}>Sort by...</option>
          <option value={"$ascending"}>Sort by $ ascending</option>
          <option value={"$descending"}>Sort by $ descending</option>
          <option value={"alpha+"}>Sort from A-Z</option>
          <option value={"alpha-"}>Sort from Z-A</option>
        </Select>
      </Wrapper>
    </>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 150px;
  height: 100vh;
  position: absolute;
`;
const Select = styled.select`
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  font-family: inherit;
  font-size: inherit;
  margin: 20px 0 0 20px;
  line-height: inherit;
  width: 110%;
  &:hover {
    cursor: pointer;
  }
`;

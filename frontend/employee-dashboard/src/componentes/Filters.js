import { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

function Filters({ onFilterChange }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <FilterContainer>
      <Input
        type="text"
        placeholder="Filtrar por nome"
        value={name}
        onChange={handleChange}
      />
    </FilterContainer>
  );
}

export default Filters;

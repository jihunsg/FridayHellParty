import React from 'react';
import styled from 'styled-components';
import MyCheckBox from "./MyCheckBox";

const SelectItem = styled.li`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${p => (p.isReserved ? '#b34040;' : '#404fb3;')};
  border: 1px solid #fff;
`;

class Seat extends React.Component {
    render() {
        const items = [];
        for (let i = 0; i < 1008; i++) {
            items.push(<MyCheckBox />);
        }
        return (
            <ul>
                {items}
                {/*{items.map((reserved) => <SelectItem isReserved={reserved} />)}*/}
            </ul>
        )
    }
}

export default Seat
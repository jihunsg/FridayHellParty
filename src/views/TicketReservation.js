import React from 'react';
import styled from 'styled-components';
import queryParser from './queryParser';
import * as axios from 'axios';

const Container = styled.div`
    align : center;
    width:280px;
    margin : 0 auto;
`;


class TicketReservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "2020 THE 신승훈 SHOW",
            time: "120분",
            concertPlace: "세종문화회관 대극장",
            date: "2020-04-11",
            rank: "8세 이상 관람가",
            price: "100,000원",
            res_number: "12341238926",
            res_date: "2020-03-06",
            res_count: "3",
            res_seat: "",
            payment: "신용카드",
        }

    }

    render() {
        return(
            <Container>
                <fieldset>
                    <div align="center">
                        공연명 / {this.state.name}
                        <br/>
                        공연장소 / {this.state.concertPlace}
                        <br/><br/><hr/>
                        예매정보
                    </div>
                    <div align="left">
                        <br/>
                        공연시간: {this.state.time}
                        <br/>
                        예매일: {this.state.res_date}
                        <br/>
                        예매번호: {this.state.res_number}
                        <br/>
                        예매인원: {this.state.res_count}명
                        <br/>
                        예매좌석: {this.state.res_seat}
                        <br/><br/><br/>
                        금액(결제정보): {this.state.price}
                        <br/>
                        결제방법: {this.state.payment}
                        <br/>
                    </div>
                </fieldset> 
            </Container>
        )
    }
}

export default TicketReservation;
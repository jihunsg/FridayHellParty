import React from 'react';
import styled from 'styled-components';
import queryParser from './queryParser';
import * as axios from 'axios';

const Container = styled.div`
    width : 80%;
    margin : 0 auto;
    align:center;
`;
const Con2_P = styled.span`  
    float:left;
    font-weight:bold;
`;
//밑에 바꿀게요
const InfoCon2 = styled.div` 
    width:330px;
    font-size : 120%;
    padding: 40px;
    text-align:right;
    align:left;
    display:inline-block;
    
`;
const Link1 = styled.a`
    text-decoration : none;
    color : black;
    &:hover {
        text-decoration : none;
        color : black;
    }
    &:link {
        text-decoration : none;
        color : black;
    }
    &:visited {
        text-decoration : none;
        color : black;
    }
    &:active {
        text-decoration : none;
        color : black;
    }
`;

const NextPageDiv = styled.div`
    position : relative;
    top : 0;
`;

const NextPage = styled.input`
    width : 40%;
    max-width:400px;
    color : white;
    font-size : 150%;
    padding : 10px 20px;
    border-radius : 10px;
    background : #22b8cf;
    border : #22b8cf;
`;

const ImgDiv = styled.div`
    display:inline;
    position: relative; 
`;

const NavLi = styled.li`
    list-style : none;
    float : left;
    margin-right : 10px;
    font-size : 120%;
`;

const CenterDiv = styled.div`
    position: relative;
    left: 50%
`;
const DDD = styled.div`

    min-width:1080px;
`;

const RL = styled.p` 
    position:relative;
    display:inline-block;
    margin:5px;
    bottom:15px;
    width: 30px;
    height: 30px;
    cursor:pointer;
    
`;
const RLA = styled.p` 
    position:relative;
    display:inline-block;
    margin:5px;
    bottom:30px;
    vertical-align:center;
    width: 30px;
    height: 30px;
`;


class TicketingView2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concert: [],
            first: true,
            count: 0,
            Reser: [],
            concertN: [],
            map: [],
            totPrice: 0,
        }
    }

    componentWillMount = async () => { //데이터 베이스
        const { match } = this.props;
        const request = axios({
            url: 'http://localhost:5000/getConcert/' + match.params.ShowId,
            method: 'get',
        });
        const { status, data } = await request;
        this.setState({
            concert: data,
        });
    }



    ReservationButtonClick = (ShowId) => {
        if (this.state.count < sessionStorage.getItem('Count')) {
            alert("좌석수가 부족합니다.");
        }
        else {
            this.state.map.map((map2) => {
                map2.map((m) => {
                    if (m.TF === 2) {
                        console.log(m.Row);
                        this.state.Reser.push({
                            row: m.Row,
                            col: m.Col,
                        });
                    }
                })
            })
            sessionStorage.setItem('reservationInfo', JSON.stringify(this.state.Reser));
            window.location.replace("/Ticketing3/" + ShowId);
        }
    }

    info = async (ShowId) => {
        const { match } = this.props;
        const request = axios({
            url: 'http://localhost:5000/defineSeat/' + ShowId,
            method: 'get',
        });
        const { status, data } = await request;
        var map2 = [];
        for (let i = 0; i < 10; i++) {
            map2.push(data.filter((Row) => Row.Row === String.fromCharCode(65 + i)));
        }
        this.setState({
            map: map2,
        });

    }
    Seat = (row, col, Seat) => {
        if (this.state.count < sessionStorage.getItem('Count') || Seat === 2) {
            const R = row.charCodeAt(row) - 65;
            if (Seat) { //예약 가능한 자리인지 확인

                if (this.state.map[R][col - 1].TF === 2) {
                    this.state.map[R][col - 1].TF = 1;
                    this.setState({
                        count: this.state.count - 1
                    });
                }
                else {
                    this.state.map[R][col - 1].TF = 2;
                    this.setState({
                        count: this.state.count + 1
                    });
                }
            }

            else {
                alert("이미 예약된 좌석입니다.");
            }
        }
        else {
            alert("인원초과");
        }

    }



    render() {
        const { match } = this.props;
        const { ShowId } = match.params;
        const { concert } = this.state;

        if (this.state.first) {
            this.setState({
                first: false,
            });
            this.info(ShowId);

        }
        return (
            <Container>
                <div align='center'>
                    <ImgDiv>
                        <img src={concert.imgUrl} width={"100%"} align="center" />
                    </ImgDiv>
                    <CenterDiv>
                        <NavLi><h3>좌석선택</h3></NavLi>
                    </CenterDiv>
                    <br />
                    <InfoCon2>
                        <Con2_P>공연 이름 :</Con2_P>{concert.name}
                    </InfoCon2>
                    <InfoCon2 >
                        <Con2_P>공연 날짜 :</Con2_P> {concert.date}
                    </InfoCon2>
                    <InfoCon2>
                        <Con2_P>가격 (1인 기준) :</Con2_P> {concert.price} 원
                    </InfoCon2>
                    <InfoCon2>
                        <Con2_P>예약 가능 인원 :  {sessionStorage.getItem('Count')}명</Con2_P>

                    </InfoCon2>
                    <InfoCon2>

                        <Con2_P>선택한 좌석 수: {this.state.count}</Con2_P>
                    </InfoCon2>
                    <DDD>
                        {this.state.map.map((map2) => {
                            return <section style={{ position: 'relative', top: '15px' }}><RLA>{map2[0].Row}</RLA>
                                {map2.map((m) => {
                                    return <RL style={{
                                        background: (m.TF >= 2 ? '#00ff00' : (m.TF ? '#b34040' : 'url("https://jihunsg.github.io/PROJECT/png/X자2.png")'))
                                    }} onClick={() => { this.Seat(m.Row, m.Col, m.TF) }} />
                                }
                                )}
                            </section>
                        })}


                    </DDD>

                    <NextPageDiv>
                        <Link1 onClick={() => { this.ReservationButtonClick(ShowId) }}>
                            <NextPage type="button" value="예매하기" />
                        </Link1>
                    </NextPageDiv>
                </div>
            </Container>
        )
    }
}

export default TicketingView2;
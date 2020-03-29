import React from 'react';
import styled from 'styled-components';
import * as axios from 'axios';

const Container = styled.div`
    width : 80%;
    margin : 0 auto;
    text-align : center;
`;

const Table = styled.table`
border-collapse: collapse;
    text-align: left;
    line-height: 1.5;
    border: 1px solid #ccc;
    margin: 20px 10px;

`;

const Thead = styled.thead`
border-right: 1px solid #ccc;
border-left: 1px solid #ccc;
background: #e7708d;

`;
const TheadTh = styled.th`
width: 150px;
padding: 10px;
font-weight: bold;
vertical-align: top;
color: #fff;
background: #e7708d;
margin: 20px 10px;

`;
const TD = styled.td`
width: 350px;
padding: 10px;
vertical-align: top;
border-bottom: 1px solid #ccc;

`;
const Tr = styled.tr`
cursor:pointer;
&: hover{
    background:lightgray;
}
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

class MyReserveView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: JSON.parse(sessionStorage.getItem('plainUserId')),

            reserveData: [{

                reservationId:[],
                concertName:[],
                concertDate:[],
                reservationPersonCnt:[],

            }]
        }
    }

    componentWillMount = async () => {
        this.getMyReserveInfo();
    }

    getMyReserveInfo = async () => {
        const request = axios({
            url: 'http://localhost:5000/getMyReservation/' + this.state.userId,
            method: 'get',
        });
        const { status, data } = await request;
        console.log(data);
        this.setState({
            reserveData: data,
        });
    }

    render() {
       
        console.log(this.state.userId)
        const {reserveData} = this.state;
        const dataList = reserveData.map(
            (data,index)=>(
               <Tr>
                   <TD>
                   {data.reservationId}
                </TD>
                <TD>
                   {data.concertName}    
                </TD>
                <TD>
                   {data.concertDate}    
                </TD>
                <TD>
                   {data.reservationPersonCnt}    
                </TD>
                <TD>
                
                <Link1 href={"http://localhost:3000/myReserveDetail/" + data.reservationId}>상세보기</Link1>

                </TD>
                </Tr>
            )
        );

        return (
            <Container>
                <div align='center'>
                    <Table>
                        <Thead>
                            <TheadTh>예약번호</TheadTh>
                            <TheadTh>공연명</TheadTh>
                            <TheadTh>공연날짜</TheadTh>
                            <TheadTh>예매수</TheadTh>
                            <TheadTh>상세정보</TheadTh>
                        </Thead>
                        <tbody>
                            {dataList}
                        </tbody>
                    </Table>
                </div>

            </Container>
            
        );
    }
}

export default MyReserveView;
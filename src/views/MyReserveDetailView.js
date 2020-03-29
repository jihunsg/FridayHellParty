import React from 'react';
import styled from 'styled-components';
import * as axios from 'axios';

const Container = styled.div`
    width : 800px;
    margin : 0 auto;
    text-align : left;
    align:center;
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
const Table = styled.table`
    border-collapse: collapse;
    text-align: center;
    margin:10px;
    padding:10px;
    width: 600px;
    height:400px;
`;

const TableHeader = styled.th`
    text-align : center;
    border: 0;
    background-color: gray;
`;
const Input = styled.input`
    position:relative;
    padding:20px;
    font-size:120%;
    left:40%;
    background:gray;
`;

class MyReserveDetailView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            first:false,
            reservationSeat:[],
            reservation_info:{},
            concert:{},
            Row:[],
            Col:[],
            Seat:[],
        }
    }
    Seat_info=async()=>{
        const { match } = this.props;
        const request = axios({
            url: 'http://localhost:5000/reservationinfo/' + match.params.ReserveId,
            method: 'get',
        });
        const { status, data } = await request;
        this.setState({
            reservationSeat: data.map(seat => `${seat.row}열 ${seat.col} `),
            Row: data.map(seat=>seat.row),
            Col:data.map(seat=>seat.col),
        });
        data.map(seat=>{this.state.Seat.push({row:seat.row, col:seat.col})});
        
    }
    Reservation_Info=async()=>{
        const { match } = this.props;
        const request = axios({
            url: 'http://localhost:5000/reservation2/' + match.params.ReserveId,
            method: 'get',
        });
        const { status, data } = await request;
        this.setState({
            reservation_info:data[0],
            first:true,
        });
        
    }
    Concert_Info=async()=>{
        console.log(this.state.reservation_info.concertId);
        const request = axios({
            url: 'http://localhost:5000/getConcert/' + this.state.reservation_info.concertId,
            method: 'get',
        });
        const { status, data } = await request;
        this.setState({
            concert: data,
            first:false,
        });
        
    }
    componentDidMount=()=>{
        this.Seat_info();
        this.Reservation_Info();
    }
    reservation_Info_Delete=async()=>{
        const { match } = this.props;
        axios({
            url: 'http://localhost:5000/reservationInfoDelete/' + match.params.ReserveId,
            method: 'delete',
        });
        axios({
            url: 'http://localhost:5000/reservationDelete/' + match.params.ReserveId,
            method: 'delete',
        });
        
        axios({
            url: 'http://localhost:5000/updateSeat/' + this.state.reservation_info.concertId,// + '/' + this.state.Row[i] + '/' + this.state.Col[i],
            method: 'put',
            data: {
                length:this.state.Seat.length,
                seat:this.state.Seat,
                TF:1,
            },
        });
        
        
    }
    reservation_cancel=()=>{
        if(confirm("예매를 취소하시겠습니까?")){
           this.reservation_Info_Delete();
           alert("예매가 취소 되었습니다.");
           //window.location.replace('/');
        }
        
    }
    render(){
        if(!sessionStorage.getItem('userid')){
            alert("로그인후 이용가능합니다.");
            window.location.replace('/');
        }
        const {concert, reservation_info}=this.state;
        const { match } = this.props;
        if(this.state.first){
            this.Concert_Info();
        }
        console.log(this.state.Seat);
        return(
            <Container>
                <Link1 href="/">
                    <img src={"http://www.nextopedu.co.kr/default/img/_images/logo.png"} />
                </Link1>
                
                <img style={{position:'relative', height:'170px'}} src={concert.imgUrl}/>
                <Table>
                    <tr>
                        <TableHeader>공연명</TableHeader>
                        <td>{reservation_info.concertName}</td>
                    </tr>
                    <tr>
                        <TableHeader>예매자</TableHeader>
                        <td>{reservation_info.userId}</td>
                    </tr>
                    <tr>
                        <TableHeader>공연날짜</TableHeader>
                        <td>{reservation_info.concertDate}</td>
                    </tr>
                    <tr>
                        <TableHeader>공연장</TableHeader>
                        <td>{concert.concertPlace}</td>
                    </tr>
                    <tr>
                        <TableHeader>좌석</TableHeader>
                        <td>{this.state.reservationSeat.map(m=> m)}</td>
                    </tr>
                    <tr>        

                        <TableHeader>예매일</TableHeader>
                        <td>{reservation_info.reservationDate}</td>
                    </tr>
                    <tr>
                        <TableHeader>결제방법</TableHeader>
                        <td>{reservation_info.payType}</td>
                    </tr>
                    <tr>
                        <TableHeader>결제금액</TableHeader>
                        <td>{reservation_info.price}</td>
                    </tr>
                    <tr>
                        <TableHeader>예매번호</TableHeader>
                        <td>{match.params.ReserveId}</td>
                    </tr>
                </Table>
                <Input type="button" value="예매 취소" onClick={this.reservation_cancel}/>
            </Container>
        );
    }
}

export default MyReserveDetailView;
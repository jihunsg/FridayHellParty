import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width : 80%;
    margin : 0 auto;
    align:center;
`;
const IDiv = styled.div`
    position:relative;
    display:inline-block;
    line-height: .5em;
   text-align:left;
   padding:10px;
   width:50%;
`;


const Minput = styled.input`
width:100%;
font-size:150%;
padding : .5em 0em .5em 0em;
    
`;
const Minput2 = styled.input`
    width:50%;
    background: #07E228;
    cursor:pointer;
    border:none;
    padding: .8em;
    font-size: 150%;
    font-weight:600;
    color:#F0F0F0;
    text-shadow: .5px .5px .5px white;
`;
const Logo = styled.div`
    position:relative;
    width:50%;
    height:50px;
    left:25%;
    text-align:center;
    font-size:200%;
    cursor:pointer;
    
`;
const InforD = styled.div`
    position:absolute;
    display:inline-block;
    right:5px;
`;

const InforA = styled.a`text-decoration:none; &:visited{color:black;} `;
const InforH3 = styled.h3` display:inline-block`;
const InforP = styled.p` display:inline-block`;

class FindMyPasswdView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: null,
            Name: null,
            PhoneNum: null,
            URL: ""
        }
    }
    Information = () => {
        if (this.state.ID != null && this.state.Name != null && this.state.PhoneNum != null) {
            alert("아이디 : " + this.state.ID + "\n이름 : " + this.state.Name + "\n전화번호 : " + this.state.PhoneNum);
            window.location.replace("http://localhost:3000/LoginView");
        }
        else {
            alert("모든 항목을 입력해 주세요");
        }
        return;
    }
    InputID = (e) => {
        this.setState({
            ID: e.target.value,
        });
    }
    InputName = (e) => {
        this.setState({
            Name: e.target.value,
        });
    }
    InputPhone = (e) => {
        this.setState({
            PhoneNum: e.target.value,
        });
    }
    render() {
        return (
            <Container>
                <InforA href="/">
                    <Logo>
                        <img src={"http://www.nextopedu.co.kr/default/img/_images/logo.png"} />
                    </Logo>
                </InforA>
                <div align="center">

                    <IDiv>
                        <InforH3>비밀번호 찾기</InforH3>
                        <InforD>
                            <InforP><InforA href="/Login">로그인 </InforA>&nbsp;<InforA href="/MemberRegister">회원가입</InforA></InforP>
                        </InforD>
                        <Minput type="text" placeholder="아이디 " onChange={this.InputID} /><br /><br />
                        <Minput type="text" placeholder="이름 " onChange={this.InputName} /><br /><br />
                        <Minput type="text" placeholder="휴대폰 번호 -없이" onChange={this.InputPhone} /> <br /><br />
                    </IDiv> <br /><br />
                    <Minput2 type="submit" value="확인" onClick={this.Information} /><br /><br />

                </div>
            </Container>
        );
    }
}

export default FindMyPasswdView;
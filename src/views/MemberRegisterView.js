import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
// The start of initialize Style
const Container = styled.div`
    width : 80%;
    margin : 0 auto;
`;

const Link = styled.a`
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
// The end of initialize Style

// The start of header
const Logo = styled.span`
    float : left;
    display : inline-block;
    font-size : 200%;
`;

const Box = styled.div`
    overflow : hidden;
`;

const Lgnb = styled.div`
    position : relative;
    left : 60%; top : 0;
`;

const LoginInput = styled.input`
    width : 40%;
    color : white;
    font-size : 150%;
    padding : 10px 20px;
    border-radius : 10px;
    background : #22b8cf;
    border : #22b8cf;
`;

const NavUl = styled.ul`
    float : right;
    padding : 5px 10px;
    display : inline-block;
`;

const NavLi = styled.li`
    list-style : none;
    float : left;
    margin-right : 10px;
    font-size : 120%;
`;
// The end point of header

// The start point of Content
const Content = styled.div`
    padding : 20px;
`;

const RegisterForm = styled.div`
`;

const FormSpan = styled.span`
    margin : 0 20px 0 350px;
`;

const IdDiv = styled.div`
    padding : 10px 0;
`;

const IdInput = styled.input`
    font-size : 150%;
    margin : 0 44px;
    &:focus {
            background : #e5f0f9;
            border : 0;
        }
`;

const IdCheck = styled.input`
    font-size : 150%;
    background : #22b8cf;
    border : 0;
    border-radius : 5px;
    color : #ffffff;
`;

const PasswdDiv = styled.div`
    padding : 10px 0;
`;

const PasswdInput = styled.input`
    font-size : 150%;
    margin : 0 28px;
    &:focus {
            background : #e5f0f9;
            border : 0;
        }
`;

const NameDiv = styled.div`
    padding : 10px 0;
`;

const NameInput = styled.input`
    font-size : 150%;
    margin : 0 60px;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const BirthDiv = styled.div`
    padding : 10px 0;
`;

const BirthInput = styled.input`
    font-size : 150%;
    margin : 0 30px;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const PhoneDiv = styled.div`
    padding : 10px 0;
`;

const PhoneInput = styled.input`
    font-size : 150%;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const MailDiv = styled.div`
    padding : 10px 0;
`;

const MailInput = styled.input`
    font-size : 150%;
    margin : 0 49px;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const ButtonDiv = styled.div`
    padding : 20px 0;
`;

const RegisterInput1 = styled.input`
    font-size : 150%;
    margin : 0 100px 0 450px;
    background : #22b8cf;
    border : 0;
    border-radius : 5px;
    color : #ffffff;
`;

const RegisterInput2 = styled.input`
    font-size : 150%;
    background : #22b8cf;
    border : 0;
    border-radius : 5px;
    color : #ffffff;
`;
// The end point of Content

class MemberRegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            username: "",
            usertel: "",
            userbirthday: "",
            useremail: "",
            userpassword: "",
        }
    }
    inputUserid = (e) => {
        this.setState({
            userid: e.target.value,
        });
    }
    inputUserpasswd = (e) => {
        this.setState({
            userpassword: e.target.value,
        });
    }
    inputUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }
    inputUserbirthday = (e) => {
        this.setState({
            userbirthday: e.target.value,
        });
    }
    inputUseremail = (e) => {
        this.setState({
            useremail: e.target.value,
        });
    }
    inputUsertel = (e) => {
        this.setState({
            usertel: e.target.value,
        });
    }

    login = async () => {
        if (this.state.userid.length < 1 || this.state.userpassword < 1 || this.state.username < 1
            || this.state.userbirthday < 1 || this.state.useremail < 1 || this.state.usertel < 1) {
            alert("모든항목을 입력해주세요");
        }
        else {
            const request = axios({
                url: 'http://localhost:5000/userinfo',
                method: 'post',
                data: {
                    userid: this.state.userid,
                    username: this.state.username,
                    password: this.state.userpassword,
                    usertel: this.state.usertel,
                    userbirthday: this.state.userbirthday,
                    useremail: this.state.useremail,
                },

            });
            const { status, data } = await request;
            alert("회원가입이 완료 되었습니다.");
            window.location.replace('/');
        }
    }
    render() {
        return (
            <Container>
                <header>
                    <Logo>
                        <Link href="/">
                            <img src={"http://www.nextopedu.co.kr/default/img/_images/logo.png"} />
                        </Link>
                    </Logo>
                    <Box>
                        <Lgnb><Link href="/Login"><LoginInput type="button" value="로그인" /></Link></Lgnb>
                        <NavUl>
                            <NavLi><Link href="/FindMyId">아이디 찾기</Link></NavLi>
                            <NavLi><Link href="/FindMyPasswd">비밀번호 찾기</Link></NavLi>
                            <NavLi><Link href="/MemberRegister">회원가입</Link></NavLi>
                        </NavUl>
                    </Box>
                </header>
                <Content>
                    <section>
                        <article>
                            <h1 align="center">계정을 위한 정보를 입력해주세요</h1>
                            <RegisterForm>
                                <IdDiv>
                                    <FormSpan>아이디</FormSpan>
                                    <IdInput type="text" placeholder="" onChange={this.inputUserid} />
                                    <IdCheck type="button" value="중복확인" />
                                </IdDiv>
                                <PasswdDiv>
                                    <FormSpan>비밀번호</FormSpan>
                                    <PasswdInput type="password" placeholder="" onChange={this.inputUserpasswd} />
                                </PasswdDiv>
                                <NameDiv>
                                    <FormSpan>이름</FormSpan>
                                    <NameInput type="text" placeholder="" onChange={this.inputUsername} />
                                </NameDiv>
                                <BirthDiv>
                                    <FormSpan>생년월일</FormSpan>
                                    <BirthInput type="text" placeholder="ex)2019.01.01" onChange={this.inputUserbirthday} />
                                </BirthDiv>
                                <PhoneDiv>
                                    <FormSpan>휴대전화번호</FormSpan>
                                    <PhoneInput type="text" placeholder="ex)010-0000-0000" onChange={this.inputUsertel} />
                                </PhoneDiv>
                                <MailDiv>
                                    <FormSpan>이메일</FormSpan>
                                    <MailInput type="email" placeholder="ex)mail@mail.com" onChange={this.inputUseremail} />
                                </MailDiv>
                                <ButtonDiv>
                                    <RegisterInput1 type="submit" value="회원가입" onClick={this.login} />
                                    <Link href="/MemberRegister"><RegisterInput2 type="reset" value="취소" /></Link>
                                </ButtonDiv>
                            </RegisterForm>
                        </article>
                    </section>
                </Content>
                <footer align="center">
                    <h3>Copyright FridayHellParty. All rights reserved.</h3>
                </footer>
            </Container>
        );
    }
}

export default MemberRegisterView;
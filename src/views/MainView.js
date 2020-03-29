import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

// The start of initialize Style
const Container = styled.div`
    width : 80%;
    margin : 0 auto;
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
// The end of initialize Style

// The start of header
const Logo = styled.span`
    float : left;
    display : inline-block;
`;

const Box = styled.div`
    overflow : hidden;
    align:right;
`;

const Lgnb = styled.div`
    align:right;
     top : 0;
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
    position:relative;
    left:0;
    float : right;
    padding : 5px 10px;
    display : inline-block;
`;

const NavLi = styled.li`
    list-style : none;
    float : left;
    margin-right : 10px;
    font-size : 15px;
`;
const Input = styled.input`
    width : 100%; height : 20px;
    font-size : 110%;
    margin : 1% 0;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;
const LoginButton = styled.button`
    width : 100%;
    height : 30px;
    font-size : 120%;
    background : #22b8cf;
    border : 0;
    margin : 1% 0 2% 0;
`;
const Logindiv = styled.div`
    width : 20%;
    float :right;
    position:relative;
    display:inline;
    right:5px;
`;

// The end point of header
const fakeAuth = {
  isAuthenticated: JSON.parse(sessionStorage.getItem('userid')) ? true : false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('plainUserId');
    setTimeout(cb, 100)
    window.location.replace('/');
  }
}
const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>
class MainView extends React.Component {
  state = {
    redirectToReferrer: JSON.parse(sessionStorage.getItem('userid')) ? true : false
  }
  constructor(props) {
    super(props);
    this.state = {
      userinfo: [],
      userid: "",
      userpassword: "",

    }
  }
  enterKeydown = (e) => {
    if (e.charCode === 13) {
      this.login();
    };
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
  login = async () => {
    if (this.state.userid.length < 1 || this.state.userpassword < 1) {
      alert("모든항목을 입력해주세요");
    }
    else {
      try {
        const request = axios.post('http://localhost:5000/forlogin/' + this.state.userid, {
          userid: this.state.userid,
          password: this.state.userpassword,
        });
        const { status, data } = await request;
        alert("로그인 성공");
        sessionStorage.setItem('userid', JSON.stringify(data));
        sessionStorage.setItem('plainUserId', JSON.stringify(this.state.userid));
        this.login2();
        window.location.replace('/');
      } catch (err) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  }
  login2 = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }


  render() {
    //const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    var dd = redirectToReferrer

    // if (redirectToReferrer === true) {
    //   return <Redirect to={from} />
    // }

    return (<div>


      <Input type="text" placeholder="아이디" onChange={this.inputUserid} onKeyPress={this.enterKeydown} /><br />
      <Input type="password" placeholder="비밀번호" onChange={this.inputUserpasswd} onKeyPress={this.enterKeydown} /><br />
      <LoginButton onClick={this.login}>로그인</LoginButton>

      <NavUl>
        <NavLi><Link1 href="/FindMyId">아이디 찾기</Link1></NavLi>
        <NavLi><Link1 href="/FindMyPasswd">비밀번호 찾기</Link1></NavLi>
        <NavLi><Link1 href="/MemberRegister">회원가입</Link1></NavLi>
      </NavUl>
    </div>)
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      {sessionStorage.getItem('plainUserId')} 님 <Link1 href="/myReserve">
            <h4>예매확인</h4>
          </Link1><button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>로그아웃</button>
    </p>
  ) : (
      <MainView />
    )
))


export default function AuthExample() {
  return (
    <Container>
      <header>
        <Logo>
          <Link1 href="/">
            <img src={"http://www.nextopedu.co.kr/default/img/_images/logo.png"} />
          </Link1>
        </Logo>
        <Box>
          <Lgnb>
            <Router>
              <Logindiv>
                <AuthButton />
              </Logindiv>
            </Router>
          </Lgnb>
        </Box>
        <div>
          
        </div>
      </header>
      <section>
        <section>
          <a href="/Ticketing1/1">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/201912/MainVisual_578b59f7-27db-4459-84a7-c6548d557581.jpg"} width="100%" />
          </a>
        </section>
        <section>
          <a href="/Ticketing1/2">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/202001/MainVisual_a302e2f2-0551-4bd8-be19-a393bafbc5ef.jpg"} width="100%" />
          </a>
        </section>
        <section>
          <a href="/Ticketing1/3">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/202002/MainVisual_8a0e0652-f863-4b83-8ea0-774bad09882a.jpg"} width="100%" />
          </a>
        </section>
        <section>
          <a href="/Ticketing1/4">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/202002/MainVisual_1df1da58-70b9-45e4-8754-8c69a5420062.jpg"} width="100%" />
          </a>
        </section>
        <section>
          <a href="/Ticketing1/5">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/202002/MainVisual_61d4e856-8af1-48f2-a04a-f43bcfd412e2.jpg"} width="100%" />
          </a>
        </section>
        <section>
          <a href="/Ticketing1/6">
            <img src={"http://ticketimage.interpark.com/TCMS4/Main/201909/MainVisual_a8d08402-654d-4ede-b637-c597d1512dc5.jpg"} width="100%" />
          </a>
        </section>
      </section>
      <footer align="center">
        <h3>Copyright FridayHellParty. All rights reserved.</h3>
      </footer>
    </Container>
  )
}
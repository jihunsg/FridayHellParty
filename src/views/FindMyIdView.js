import React, { Component } from 'react';
import styled, { css } from 'styled-components';

// The start of initialize style
const Container = styled.div`
    width : 80%;
    margin : 0 auto;
    text-align : center;
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
// The end of initialize style

// The start of header
const Logo = styled.span`
    font-size : 300%;
`;
// The end of header

// The start of section
const FindId = styled.section`
    padding : 5% 0;
`;

const ContentHeader = styled.span`
    display : inline-block;
    margin-right : 80px;
`;

const LinkSpan = styled.span`
    display : inline-block;
    font-size : 120%;
    margin-left : 20px;
`;

const NameInput = styled.input`
    width : 40%; height : 50px;
    font-size : 150%;
    margin : 1% 0;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const PhoneInput = styled.input`
    width : 40%; height : 50px;
    font-size : 150%;
    margin : 1% 0;
    &:focus {
        background : #e5f0f9;
        border : 0;
    }
`;

const FindButton = styled.button`
    width : 40%; height : 60px;
    font-size : 150%;
    margin : 1% 0;
    background : #22b8cf;
    border : 0;
    color : #ffffff;
`;
// The end of section

class FindMyIdView extends Component {
    constructor(props) {
        super(props);
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
                </header>
                <section>
                    <FindId>
                        <article>
                            <ContentHeader><h3>아이디 찾기</h3></ContentHeader>
                            <LinkSpan><Link href="/FindMyPasswd">로그인</Link></LinkSpan>
                            <LinkSpan><Link href="/FindMyPasswd">비밀번호 찾기</Link></LinkSpan>
                            <LinkSpan><Link href="/MemberRegister">회원가입</Link></LinkSpan>
                        </article>
                        <article>
                            <div>
                                <NameInput type="text" placeholder="이름 입력" /><br />
                                <PhoneInput type="text" placeholder="휴대전화번호 -없이 입력" />
                            </div>
                        </article>
                        <article>
                            <FindButton>확인</FindButton>
                        </article>
                    </FindId>
                </section>
                <footer>
                    <h3>Copyright FridayHellParty. All rights reserved.</h3>
                </footer>
            </Container>
        )
    }
}

export default FindMyIdView;
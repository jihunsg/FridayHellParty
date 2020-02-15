import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width : 80%;
    margin : 0 auto;
`;

const LoginView = () => (
    <Container>
        <div>
            <a href="/">로고</a><br />
            <input type="text" placeholder="아이디 입력" /><br />
            <input type="password" placeholder="비밀번호 입력" /><br />
            <input type="button" value="로그인" /><br />
            hello
            <a href="#">아이디 찾기</a> <a href="#">비밀번호 찾기</a> <a href="/MemberRegisterView">회원가입</a>
        </div>
    </Container>
);

export default LoginView;
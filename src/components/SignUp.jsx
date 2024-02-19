import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useHistory 추가
import MediaQuery from "react-responsive";
import styled from 'styled-components';
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios';

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/images/back.jpg'); /* 배경 이미지 파일 경로에 맞게 수정 */
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const Page = styled.div`
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 83%;
  max-width: 500px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  margin-top: 20px;
  font-size: 32px;
  font-weight: 700;
  color: #333;
  text-align: center;
`;

const ContentWrap = styled.div`
  margin-top: 25px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  margin-left: 80px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 12px;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: relative;

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 25px;
  font-size: 16px;

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessageWrap = styled.div`
  margin-top: -8px;
  color: #ef0000;
  font-size: 14px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  margin-left: 80px;
  margin-bottom: 20px;
`;

const OverLapButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  background-color: ${({ disabled }) => (disabled ? '#dadada' : '#9e30f4')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#dadada' : '#7a2386')};
  }
`;

const ReactionWrap = styled.div`
  position: relative;
  margin-bottom: 200px;
`;

const ReactionText = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
  font-weight: 700;
  color: rgba(75, 75, 75, 0.3);

  span {
    color: #9e30f4;
  }
`;

const SignUpButton = styled.button`
  width: 87%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: ${({ disabled }) => (disabled ? '#dadada' : '#9e30f4')};
  border-radius: 15px;
  color: white;
  margin-top: -50px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  transition: background-color 0.3s;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-size: 15px;
`;

//여기서부터 모바일 환경 컴포넌트
const MobileContainer = styled.div`
    width: 100vw;
    height: 100dvh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
`

const MobileHeader = styled.div`
    width: 100%;
    height: 10%; 
    background-color: lightsalmon;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const MobileHeaderL = styled.div`
    width: 10%;
    height: 100%;
    display: flex-start;
    justify-content: center;
    align-items: center;
`

const MobileHeaderM = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MobileHeaderR = styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const MobileMain = styled.div`
    width: 100%;
    height: 90%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center; /* 수평 가운데 정렬을 위해 사용 */
`;

const MobileInputTitle1 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 8%;
  color: #333;
  width: 100%;
  margin-left: 15%;
`;

const MobileInputWrap1 = styled.div`
  display: flex; 
  align-items: center; 
  border-radius: 8px;
  padding: 16px;
  margin-top: 3%;
  width: 80%;
  max-width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileInputTitle2 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 8%;
  color: #333;
  width: 100%;
  margin-left: 15%;
`;

const MobileInputWrap2 = styled.div`
  display: flex; 
  border-radius: 8px;
  padding: 16px;
  margin-top: 3%;
  width: 80%;
  max-width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileOverLapButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#dadada' : '#9e30f4')};
  color: white;
  border: none;
  border-radius: 5px;
  width: 100px; 
  height: 30px;

`;

const MobileErrorMessageWrap1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-left:65px;
  margin-top: 5px;
  color: #ef0000;
  font-size: 14px;
`;

const MobileInputTitle3 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 8%;
  color: #333;
  width: 100%;
  margin-left: 15%;
`;

const MobileInputWrap3 = styled.div`
  display: flex; 
  align-items: center; 
  border-radius: 8px;
  padding: 16px;
  margin-top: 3%;
  width: 80%;
  max-width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileErrorMessageWrap2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-left:65px;
  margin-top: 5px;
  color: #ef0000;
  font-size: 14px;
`;

const MobileInputTitle4 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 8%;
  color: #333;
  width: 100%;
  margin-left: 15%;
`;

const MobileInputWrap4 = styled.div`
  display: flex; 
  align-items: center; 
  border-radius: 8px;
  padding: 16px;
  margin-top: 3%;
  width: 80%;
  max-width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileErrorMessageWrap3 = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-left:65px;
  margin-top: 5px;
  color: #ef0000;
  font-size: 14px;
`;

const MobileSignUpButton = styled.button`
  width: 90%;
  height: 50px;
  border: none;
  font-weight: 700;
  margin-top: 40px;
  background-color: ${(props) => (props.disabled ? '#dadada' : '#9e30f4')};
  border-radius: 15px;
  color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;
  font-size: 15px;
`;

const LinkStyle = {
  textDecoration: 'none',
  color: 'black',
};

export default function SignUp() {
  // 사용자 이름, 아이디, 비밀번호, 비밀번호 확인 변수 선언
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const history = useNavigate();

  // 입력 유효성 검사를 위한 변수들임
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  
  // 전체 유효성 검사를 위한 변수임
  const [notAllow, setNotAllow] = useState(true);

  // 사용자명 입력 핸들러임
  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateButtonState(newName, id, pw, confirmPw);
  };

  // 아이디 입력 핸들러임
  const handleId = (e) => {
    const newId = e.target.value;
    setId(newId);
    setIdValid(newId.length >= 7);
    updateButtonState(name, newId, pw, confirmPw);
  };

  // 비밀번호 입력 핸들러임
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPw(newPassword);
    setPwValid(newPassword.length >= 4);
    updateButtonState(name, id, newPassword, confirmPw);
  };

  // 비밀번호 확인 입력 핸들러임
  const handleConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPw(newConfirmPassword);
    setConfirmPwValid(newConfirmPassword === pw);
    updateButtonState(name, id, pw, newConfirmPassword);
  };

  // 전체 유효성을 갱신하는 함수임
  const updateButtonState = (newName, newId, newPassword, newConfirmPassword) => {
    setNotAllow(
      !(
        newName.length > 0 &&
        newId.length >= 7 &&
        newPassword.length >= 4 &&
        newConfirmPassword === newPassword
      )
    );
  };

  // 회원가입 버튼 클릭 핸들러임
  const onClickSignUpButton = () => {
    if (!notAllow) {
      axios.post(process.env.REACT_APP_WAITLIST_API_URL + '/api/join', {
      id: id,
      pw: pw,
      name : name,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
	      if(response.data == true)
	      {
      		alert('회원가입에 성공했습니다.');
		history('/SignIn');
	      }
	       else
	      {
		alert('회원가입 중에 오류가 발생했습니다.');
		setName('');
		setId('');
		setPw('');
		setConfirmPw('');
	      }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response) {
          alert('Server response:', error.response.data);
        }
      });
    }
  };

  // 엔터 키 다운 가능하게 만든 핸들러임
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !notAllow) {
      onClickSignUpButton();
    }
  };

  const onClickCheckId = () => {
	axios.post(process.env.REACT_APP_WAITLIST_API_URL + '/api/checkid', {
        id: id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if(response.data == true)
          {
            alert("사용가능한 아이디 입니다.");
          }
          else
          {
            alert("중복되는 아이디 입니다.");
          }
        })
        .catch(error => {
          alert('Error fetching data:', error);
          if (error.response) {
            alert('Server response:', error.response.data);
          }
        });
  };	

  return (
    <div>
      <MediaQuery minWidth={767}>
        <BackgroundImage />
        <Page>
          <TitleWrap>회원가입</TitleWrap>

          <ContentWrap>
            <InputTitle>사용자명</InputTitle>
            <InputWrap>
              <Input
                type='text'
                placeholder='사용자명 입력'
                value={name}
                onChange={handleName}
              />
            </InputWrap>

            <InputTitle>아이디</InputTitle>
            <InputWrap>
              <Input
                type='text'
                placeholder='아이디 입력'
                value={id}
                onChange={handleId}
              />
              <OverLapButton disabled={!idValid}>중복확인</OverLapButton>
            </InputWrap>

            <ErrorMessageWrap>
              {!idValid && id.length > 0 && <div>7자 이상 입력하세요</div>}
            </ErrorMessageWrap>

            <InputTitle>비밀번호</InputTitle>
            <InputWrap>
              <Input
                type='password'
                placeholder='비밀번호 입력'
                value={pw}
                onChange={handlePassword}
              />
            </InputWrap>

            <ErrorMessageWrap>
              {!pwValid && pw.length > 0 && <div>4자 이상 입력하세요</div>}
            </ErrorMessageWrap>

            <InputTitle>비밀번호 확인</InputTitle>
            <InputWrap>
              <Input
                type='password'
                placeholder='비밀번호 확인 입력'
                value={confirmPw}
                onChange={handleConfirmPassword}
                onKeyDown={handleKeyDown}
              />
            </InputWrap>

            <ErrorMessageWrap>
              {!confirmPwValid && confirmPw.length > 0 && <div>비밀번호가 일치하지 않습니다</div>}
            </ErrorMessageWrap>
          </ContentWrap>

          <ReactionWrap>
            <ReactionText>
              R<span>e</span>action
            </ReactionText>
          </ReactionWrap>

          <SignUpButton onClick={onClickSignUpButton} disabled={notAllow}>
            회원가입
          </SignUpButton>
        </Page>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <MobileContainer>
          <MobileHeader>
            <MobileHeaderL>
              <Link to="/SignIn" style={LinkStyle}>
                <IoArrowBackOutline style={{ width: "100%", height: "100%", marginLeft: "10px" }} />
              </Link>
            </MobileHeaderL>

            <MobileHeaderM>
              <h1 style={{ fontFamily: "Itim-Regular" }}>Reaction</h1>
            </MobileHeaderM>

            <MobileHeaderR />
          </MobileHeader>

          <MobileMain>
            <MobileInputTitle1>사용자명</MobileInputTitle1>
            <MobileInputWrap1>
              <Input
                type='text'
                placeholder='사용자명 입력'
                value={name}
                onChange={handleName}
              />
            </MobileInputWrap1>

            <MobileInputTitle2>아이디</MobileInputTitle2>
            <MobileInputWrap2>
              <Input
                type='text'
                placeholder='아이디 입력'
                value={id}
                onChange={handleId}
              />
              <MobileOverLapButton disabled={!idValid}>중복확인</MobileOverLapButton>
            </MobileInputWrap2>

            <MobileErrorMessageWrap1>
              {!idValid && id.length > 0 && <div>7자 이상 입력하세요</div>}
            </MobileErrorMessageWrap1>

            <MobileInputTitle3>비밀번호</MobileInputTitle3>
            <MobileInputWrap3>
              <Input
                type='password'
                placeholder='비밀번호 입력'
                value={pw}
                onChange={handlePassword}
              />
            </MobileInputWrap3>

            <MobileErrorMessageWrap2>
              {!pwValid && pw.length > 0 && <div>4자 이상 입력하세요</div>}
            </MobileErrorMessageWrap2>

            <MobileInputTitle4>비밀번호 확인</MobileInputTitle4>
            <MobileInputWrap4>
              <Input
                type='password'
                placeholder='비밀번호 확인 입력'
                value={confirmPw}
                onChange={handleConfirmPassword}
                onKeyDown={handleKeyDown}
              />
            </MobileInputWrap4>

            <MobileErrorMessageWrap3>
              {!confirmPwValid && confirmPw.length > 0 && <div>비밀번호가 일치하지 않습니다</div>}
            </MobileErrorMessageWrap3>

            <MobileSignUpButton onClick={onClickSignUpButton} disabled={notAllow}>
            회원가입
          </MobileSignUpButton>

          </MobileMain>

        </MobileContainer>
      </MediaQuery>
    </div>
  );
}

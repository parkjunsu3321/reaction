import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import axios from 'axios';
import MediaQuery from "react-responsive";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

import { FaLock } from "react-icons/fa";
import { BiSolidWidget } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { ImMenu } from "react-icons/im";

const PwTitle = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-left: 15px;
`;

const PwLine1 = styled.hr`
  border: 1px solid lightgray;
`;

const PwVertical1 = styled.div`
  position: relative;
  border-left: 2px solid #d9d9d9;
  height: 49px;
  top: 3%;
`;

const PwText = styled.div`
  position: relative;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-left: 30px;
  top: 25%;
`;

const PwLine2 = styled.hr`
  position: relative;
  border: 2px solid #ff5000;
  margin-top: -30px;
  margin-left: 0px;
  width: 15%;
`;

const PwVertical2 = styled.div`
  position: relative;
  border-left: 2px solid #d9d9d9;
  height: 49px;
  top: -1%;
  left: 182px;
`;

const PwLine3 = styled.hr`
  position: relative;
  border: 1px solid #d9d9d9;
  margin-top: -8px;
  margin-left: 182px;
  width: 85%;
`;

const CurrentPwText = styled.div`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-left: 30px;
`;

const PwInput1 = styled.input`
  border-radius: 10px;
  padding: 18px;
  margin-top: 15px;
  margin-left: 25px;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ChangePwText = styled.div`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-left: 30px;
`;

const PwInput2 = styled.input`
  border-radius: 10px;
  padding: 18px;
  margin-top: 15px;
  margin-left: 25px;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ConfirmPwText = styled.div`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-left: 30px;
`;

const PwInput3 = styled.input`
  border-radius: 10px;
  padding: 18px;
  margin-top: 15px;
  margin-left: 25px;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ErrorMessage = styled.div`
  position: absolute;
  margin-left: 30px;
  margin-top: 7px;
  color: red;
  font-size: 14px;
`;

const PwChangeBtn = styled.button`
  width: 15%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: #289951;
  border-radius: 15px;
  color: white;
  margin-top: 79px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  font-size: 15px;
  margin-left: 990px;

  &:disabled { /*버튼 비활성화 시*/
    background-color: #dadada;
    color: white;
    cursor: not-allowed;
  }
`;

//여기서부터 모바일 환경 컴포넌트
const MobileFrame = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const RealMobileHeader = styled.div`
    height: 10%; 
    background-color: lightsalmon;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MobileHeaderL = styled.div`
    width: 50%;
    height: auto;
    margin-left: 5%;
`;

const MobileHeader = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: antiquewhite;
`;

const MobileHeaderA = styled.div`
  width: 10%;
  height: 100%;
  display: flex-start;
  justify-content: center;
  align-items: center;
`;

const MobileHeaderB = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileHeaderC = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MobilePwText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const MobileMain = styled.div`
  width: 100%;
  height:70%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileMainA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:20%;
  margin-top:20px;
`;

const MobileCurrentPwText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`;

const MobilePwInput = styled.input`
  display: flex; 
  align-items: center; 
  justify-content:center;
  border-radius: 20px;
  padding: 16px;
  margin-top: 20px;
  width: 80%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileMainB = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:20%;
`;

const MobileChangePwText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin-top: 10px;
`;

const MobilePwInput2 = styled.input`
  display: flex; 
  align-items: center; 
  justify-content:center;
  border-radius: 20px;
  padding: 16px;
  margin-top: 20px;
  width: 80%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileMainC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:20%;
`;

const MobileConfirmPwText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin-top: 20px;
`;

const MobilePwInput3 = styled.input`
  display: flex; 
  align-items: center; 
  justify-content:center;
  border-radius: 20px;
  padding: 16px;
  margin-top: 20px;
  width: 80%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

  &:focus-within {
    border: 1px solid #9e30f4;
    box-shadow: 0 0 10px rgba(158, 48, 244, 0.3);
  }
`;

const MobileErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const MobilePwChangeBtn = styled.button`
  width: 90%;
  height: 60px;
  border: none;
  font-weight: bold;
  background-color: white;
  border-radius: 15px;
  color: #ff813a;
  margin-top: 75px;
  font-size: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);

  border-width: 1px;
  border-style: solid;
  border-color: lightgray;

  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

const MobileFooter = styled.div`
    height: 10%;
    background-color: lightsalmon;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MobileSignBtn = styled.button`
    width: auto;
    height: 30px;
    background-color: orange;
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    font-weight: bolder;
    cursor: pointer;
    margin-left: 5%;
`;

const LinkStyle = {
  textDecoration: 'none',
  color: 'black',
};

const LinkStyle2 = {
  textDecoration: 'none',
  color: 'black',
};

const IconStyle = {
  width: '30px',
  height: '30px',
};

export default function PwChange() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmPwValid, setConfirmPwValid] = useState(false);

  // 현재 비밀번호 입력값 변경 핸들러
  const handleCurrentPwChange = (e) => {
    setCurrentPw(e.target.value);
  };

  // 새로운 비밀번호 입력값 변경 핸들러
  const handleNewPwChange = (e) => {
    setNewPw(e.target.value);
  };

  // 새로운 비밀번호 확인 입력값 변경 핸들러
  const handleConfirmPwChange = (e) => {
    const newConfirmPw = e.target.value;
    setConfirmPw(newConfirmPw);
    setConfirmPwValid(newConfirmPw === newPw);
  };

  // 새로운 비밀번호와 확인 값이 일치하는지 여부
  const isPwMatch = newPw === confirmPw;
  // 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 값이 비어 있지 않고, 새 비번과 확인 값이 일치하는 경우 변경 가능
  const isPwValid = currentPw !== '' && newPw !== '' && isPwMatch;

  const handlePwChange = async () => { // 변경된 부분
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
      const checkrequestData = { user_password: currentPw}; // 변경된 부분
      const response = await axios.post(process.env.REACT_APP_FAST_API_KEY+'/api/users/check_passwrod', checkrequestData, config);
      if(response.data === true)
      {
        const requestData = { new_password: newPw}; // 변경된 부분
        const response = await axios.post(process.env.REACT_APP_FAST_API_KEY+'/api/users/changing_password', requestData, config);
        if (response.data === true) 
        {
            alert('비밀번호 변경 성공');
        } 
        else 
        {
            alert('비밀번호 변경 실패');
        }
      }
      else
      {
        alert('현재 비밀번호를 잘못 입력하셨습니다.')
      }
    } 
    catch (error) 
    {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <>

      <MediaQuery minWidth={767}>
        <PwTitle>비밀번호 변경</PwTitle>
        <PwLine1 />
        <PwVertical1>
          <PwText>비밀번호 변경</PwText>
        </PwVertical1>
        <PwLine2 />
        <PwVertical2 />
        <PwLine3 />
        <CurrentPwText>현재 비밀번호</CurrentPwText>
        <PwInput1
          type='password'
          placeholder='기존 비밀번호를 입력해주세요.'
          value={currentPw}
          onChange={handleCurrentPwChange}
        />
        <ChangePwText>변경 비밀번호</ChangePwText>
        <PwInput2
          type='password'
          placeholder='새로운 비밀번호를 입력해주세요.'
          value={newPw}
          onChange={handleNewPwChange}
        />
        <ConfirmPwText>비밀번호 확인</ConfirmPwText>
        <PwInput3
          type='password'
          placeholder='새로운 비밀번호를 다시 입력하세요.'
          value={confirmPw}
          onChange={handleConfirmPwChange}
        />
        {!confirmPwValid && confirmPw.length > 0 && (
          <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
        )}
        <PwChangeBtn disabled={!isPwValid} onClick={handlePwChange}>
          변경하기
        </PwChangeBtn>
      </MediaQuery>

      {/*여기부터 모바일 환경*/}
      <MediaQuery maxWidth={767}>
        <MobileFrame>
          <RealMobileHeader>
            <MobileHeaderL>
              <Link to="/" style={LinkStyle} >
                <h1 style={{ fontFamily: "Itim-Regular" }}>Reaction</h1>
              </Link>
            </MobileHeaderL>
          </RealMobileHeader>

          <MobileHeader>
            <MobileHeaderA>
              <Link to="/MyInfo" style={LinkStyle}>
                <IoClose style={{ width: "100%", height: "100%" }} />
              </Link>
            </MobileHeaderA>

            <MobileHeaderB>
              <MobilePwText>비밀번호 변경</MobilePwText>
            </MobileHeaderB>

            <MobileHeaderC />
          </MobileHeader>

          <MobileMain>
            <MobileMainA>
              <MobileCurrentPwText>현재 비밀번호</MobileCurrentPwText>
              <MobilePwInput
                type='password'
                placeholder='기존 비밀번호를 입력해주세요.'
                value={currentPw}
                onChange={handleCurrentPwChange}
              />
            </MobileMainA>

            <MobileMainB>
              <MobileChangePwText>변경 비밀번호</MobileChangePwText>
              <MobilePwInput2
                type='password'
                placeholder='새로운 비밀번호를 입력해주세요.'
                value={newPw}
                onChange={handleNewPwChange}
              />
            </MobileMainB>

            <MobileMainC>
              <MobileConfirmPwText>비밀번호 확인</MobileConfirmPwText>
              <MobilePwInput3
                type='password'
                placeholder='새로운 비밀번호를 다시 입력하세요.'
                value={confirmPw}
                onChange={handleConfirmPwChange}
              />
              {!confirmPwValid && confirmPw.length > 0 && (
                <MobileErrorMessage>비밀번호가 일치하지 않습니다</MobileErrorMessage>
              )}
            </MobileMainC>

            <MobilePwChangeBtn disabled={!isPwValid} onClick={handlePwChange}>
              변경하기
            </MobilePwChangeBtn>
          </MobileMain>

          <MobileFooter>
            <Link to="/MyInfo" style={LinkStyle}>
              <FaUserLarge style={IconStyle} />
            </Link>
            <Link to="/" style={LinkStyle}>
              <BiSolidWidget style={IconStyle} />
            </Link>
            <Link to="/Ranking" style={LinkStyle}>
              <FaRankingStar style={IconStyle} />
            </Link>
            <Link to="/UserStatus" style={LinkStyle}>
              <ImMenu style={IconStyle} />
            </Link>
          </MobileFooter>
        </MobileFrame>
      </MediaQuery>
    </>
  )
}

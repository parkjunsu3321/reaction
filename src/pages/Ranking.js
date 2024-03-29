import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MediaQuery from "react-responsive";
import styled from "styled-components";
import { FaCircleUser } from "react-icons/fa6";
import { RiVipCrownFill } from "react-icons/ri";
import axios from 'axios';

//여기서부터 모바일 환경 컴포넌트
const MobileFrame = styled.div`
    width: 100vw;
	height: 100%;
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

const MobileRankText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 19px;
    font-weight: 700;
    color: #333;
`;

const MobileMain = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    background-image: url('/images/Ranking.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    h1 {
        margin:0px;
        padding:0px;
    }
`;

const MobileMainA = styled.div`
	height: 100%;
    width: 33%;
	display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 8px;
`;

const MobileMainAa = styled.div` 
    height: 30%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const MobileMainAb = styled.div` 
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileMainAc = styled.div` 
    height: 40%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 8px;
`;

const MobileMainB = styled.div`
	height: 100%;
    width: 40%;
	display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
`;

const MobileMainBa = styled.div` 
    height: 10%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const MobileMainBb = styled.div` 
    height: 38%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileMainBc = styled.div` 
    height: 52%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 8px;
`;

const MobileMainC = styled.div`
	height: 100%;
    width: 32%;
	display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 8px;
`

const MobileMainCa = styled.div` 
    height: 36%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const MobileMainCb = styled.div` 
    height: 30%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 8px;
`;

const MobileMainCc = styled.div` 
    height: 37%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooter = styled.div`
	height: 40%;
    width: 100%;
	  display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #76389c;
    overflow: scroll;
`;

const MobileFooterA = styled.div`
    height: 25%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    background-color: white;
`;

const MobileFooterAa = styled.div` 
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    border-radius: 10px;
`;

const MobileFooterAb = styled.div`
	height: 100%;
    width: 15%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`

const MobileFooterAc = styled.div`
	height: 100%;
    width: 40%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterAd = styled.div`
	height: 100%;
    width: 30%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: #e5bbe8;
`;

const MobileFooterB = styled.div`
	height: 25%;
    width: 100%;
	display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background-color: white;
`;

const MobileFooterBa = styled.div` 
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const MobileFooterBb = styled.div`
	height: 100%;
    width: 15%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterBc = styled.div`
	height: 100%;
    width: 40%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterBd = styled.div`
	height: 100%;
    width: 30%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: #e5bbe8;
`;

const MobileFooterC = styled.div`
	height: 25%;
    width: 100%;
	display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background-color: white;
`;

const MobileFooterCa = styled.div` 
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const MobileFooterCb = styled.div`
	height: 100%;
    width: 15%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterCc = styled.div`
	height: 100%;
    width: 40%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterCd = styled.div`
	height: 100%;
    width: 30%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: #e5bbe8;
`;

const MobileFooterD = styled.div`
	height: 25%;
    width: 100%;
	display: flex;
    align-items: center;
    background-color: white;
`;

const MobileFooterDa = styled.div` 
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const MobileFooterDb = styled.div`
	height: 100%;
    width: 15%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterDc = styled.div`
	height: 100%;
    width: 40%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
`;

const MobileFooterDd = styled.div`
	height: 100%;
    width: 30%;
	display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: #e5bbe8;
`;

const Text = styled.h1`
  margin-right: 20px;
`;

const StyledIcon = styled(FaCircleUser)`
  font-size: 40px;
  color: skyblue;
`;

const NullSpace = styled.div`
	height: 100%;
    width: 5%;
	display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`;

const Ranking = () => {
    
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_FAST_API_KEY+'/api/result/all');
                setGameResults(response.data);
            } catch (error) {
                console.error('Error fetching game results:', error);
            }
        };

        fetchData();
    }, []);

     const first_player = gameResults.length > 0 ? gameResults[0].game_result_player_id : "";
     const first_score = gameResults.length > 0 ? gameResults[0].game_result_score : "";
     
     const second_player = gameResults.length > 0 ? gameResults[1].game_result_player_id : "";
     const second_score = gameResults.length > 0 ? gameResults[1].game_result_score : "";

     const third_player = gameResults.length > 0 ? gameResults[2].game_result_player_id : "";
     const third_score = gameResults.length > 0 ? gameResults[2].game_result_score : "";

     const fourth_player = gameResults.length > 0 ? gameResults[3].game_result_player_id : "";
     const fourth_score = gameResults.length > 0 ? gameResults[3].game_result_score : "";

     const fifth_player = gameResults.length > 0 ? gameResults[4].game_result_player_id : "";
     const fitfh_score = gameResults.length > 0 ? gameResults[4].game_result_score : "";

     const sixth_player = gameResults.length > 0 ? gameResults[5].game_result_player_id : "";
     const sixth_score = gameResults.length > 0 ? gameResults[5].game_result_score : "";

     const seventh_player = gameResults.length > 0 ? gameResults[6].game_result_player_id : "";
     const seventh_score = gameResults.length > 0 ? gameResults[6].game_result_score : "";

    const RankingContent = (
        <>
            <MediaQuery minWidth={767}/>

            {/*여기부터 모바일 환경*/}
            <MediaQuery maxWidth={767}>
                <MobileFrame>
                    <MobileHeader>
                        <MobileRankText>
                        <RiVipCrownFill style={{width:"10%",height:"40%"}}/>
                        명예의 전당
                        </MobileRankText>
                        
                    </MobileHeader>

                    <MobileMain>
                    <NullSpace/>
                        <MobileMainA>
                            <MobileMainAa>
                            <h1>{second_score}</h1>
                            </MobileMainAa>

                            <MobileMainAb/>

                            <MobileMainAc>
                            <h1>{second_player}</h1>
                            </MobileMainAc>
                        </MobileMainA>

                        <MobileMainB>
                            <MobileMainBa>
                                <h1 style={{marginLeft:"10px"}}>{first_score}</h1>
                            </MobileMainBa>

                            <MobileMainBb/>

                            <MobileMainBc>
                                <h1>
                                {first_player}
                                </h1>
                            </MobileMainBc>
                        </MobileMainB>

                        <MobileMainC>
                            <MobileMainCa>
                            <h1>{third_score}</h1>
                            </MobileMainCa>

                            <MobileMainCb/>

                            <MobileMainCc>
                            <h1>{third_player}</h1>
                            </MobileMainCc>
                        </MobileMainC>

                        <NullSpace/>
                    </MobileMain>

                    <MobileFooter>
                        <MobileFooterA>
                            <MobileFooterAa>
                                <h1>4</h1>
                            </MobileFooterAa>

                            <MobileFooterAb>
                            <StyledIcon />
                            </MobileFooterAb>

                            <MobileFooterAc>
                            <Text>{fourth_player}</Text>
                            </MobileFooterAc>

                            <MobileFooterAd>
                                <h1>{fourth_score}</h1>
                            </MobileFooterAd>
                        </MobileFooterA>

                        <MobileFooterB>
                            <MobileFooterBa>
                                <h1>5</h1>
                            </MobileFooterBa>

                            <MobileFooterBb>
                            <StyledIcon />
                            </MobileFooterBb>

                            <MobileFooterBc>
                            <Text>{fifth_player}</Text>
                            </MobileFooterBc>

                            <MobileFooterBd>
                                <h1>{fitfh_score}</h1>
                            </MobileFooterBd>
                        </MobileFooterB>

                        <MobileFooterC>
                            <MobileFooterCa>
                                <h1>6</h1>
                            </MobileFooterCa>

                            <MobileFooterCb>
                            <StyledIcon />
                            </MobileFooterCb>

                            <MobileFooterCc>
                            <Text>{sixth_player}</Text>
                            </MobileFooterCc>

                            <MobileFooterCd>
                                <h1>{sixth_score}</h1>
                            </MobileFooterCd>
                        </MobileFooterC>

                        <MobileFooterD>
                            <MobileFooterDa>
                                <h1>7</h1>
                            </MobileFooterDa>

                            <MobileFooterDb>
                            <StyledIcon />
                            </MobileFooterDb>

                            <MobileFooterDc>
                            <Text>{seventh_player}</Text>
                            </MobileFooterDc>

                            <MobileFooterDd>
                                <h1>{seventh_score}</h1>
                            </MobileFooterDd>
                        </MobileFooterD>
                    </MobileFooter>
                </MobileFrame>
            </MediaQuery>
        </>
    )

    return (
        <Layout RightMainContent={RankingContent} />
    );
};

export default Ranking;

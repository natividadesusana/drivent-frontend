import styled from 'styled-components';

export const HotelContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: auto;
    height: auto;
    overflow-x: scroll;
    

    button {
        width: 200px;
        height: 40px;
        background: #ececec;
        border-radius: 10px;
        font-weight: bold;
        font-size: 11px;
        margin-bottom: 50px;
        background-color: lightgray;
        font-family: 'Roboto';
        cursor: pointer;
    }

    h3 {
        font-size: 15px;
        color: gray;
        margin-bottom: 20px;
    }
`;

export const HotelBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px;
    height: 260px;
    background-color: ${p => (p.infoHotel === p.id || p.chosenHotel === p.id) ? '#fae4ac' : '#ececec'};
    margin-right: 15px;
    margin-bottom: 30px;
    border-radius: 10px;
    align-items: flex-start;
    padding: 10px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100px;
    }

    h1 {
        font-size: 17px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    h2 {
        font-size: 13px;
        margin-bottom: 5px;
        font-weight: bold;
    }

    p {
        font-size: 12px;
        margin-bottom: 15px;
    }
`;

export const TitleContainer = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;

export const SubtitleContainer = styled.p`
    font-size: 15px;
    margin-bottom: 20px;
`;

export const HotelList = styled.div`
    display: flex;
    width: 100vw;
    height: 100%;
    padding: 5px;
`;

export const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    margin-bottom: 50px;
    margin-top: 20px;
`;

export const Room = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 35px;
    background-color: ${p => p.chosenRoom === p.id ? '#fae4ac' : 'white'};
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: solid 1px black;
    cursor: pointer;
    p {
        font-size: 15px;
    }

    div {
        display: flex;
    }
`;

export const RoomCrowded = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 35px;
    background-color: lightgray;
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: solid 1px black;

    p {
        font-size: 15px;
    }

    div {
        display: flex;
    }
`;

export const ContainerReserve = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        color: gray;
        margin-bottom: 10px;
    }
`;

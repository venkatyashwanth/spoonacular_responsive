import jwt_decode from 'jwt-decode';

const GetTest = () => {
    const data = JSON.parse(localStorage.getItem("_token"));
    console.log(data);
    const hidden_data = jwt_decode(data.token);
    console.log(hidden_data);
    return(
        <>
        <h1>This is a test page</h1>
        </>
    )
}



export default GetTest;

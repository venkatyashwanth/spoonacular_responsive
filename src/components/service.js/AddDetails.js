import axios from "axios";

const addDetails = async (details) => {
  const user = details.username;
  const email = details.email;
  const password = details.yPassword;

  let localData = (() => {
    const localValue = localStorage.getItem("profileData");
    return localValue === null ? [] : JSON.parse(localValue);
  })();

  const url = `https://api.spoonacular.com/users/connect?apiKey=${process.env.REACT_APP_API_KEY}`;
  const options = {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.post(url, { options }).then((res) => {
    localData.push({user,email,password,...res.data});
    console.log(localData);
    localStorage.setItem("profileData", JSON.stringify(localData));
  });
};

export default addDetails;



//     const options = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//     const doNetworkCall = async () => {
//       try {
//         const response = await fetch(url, options);
//         const jsonData = await response.json();
//         setUserData(jsonData.days)
//         if(jsonData.days.length === 0){
//             setMessage("No Meal Data For Next 7 days")
//         }else{
//             setMessage("")
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     doNetworkCall();
//   };
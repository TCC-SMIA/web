import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
}

body{
   -webkit-font-smoothing: antialiased;
   ::-webkit-scrollbar{
     display: none;
  }
}

body, input, button {
   font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}


a{
   text-decoration: none;
}

ul{
   list-style: none;
}

button{
   cursor: pointer;
}
`;

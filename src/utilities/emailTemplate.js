export const emailTemplate = function (url) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Saraha APP</title>
  <style>
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    body {
      background-color: #eee;
      font-family:Arial, Helvetica, sans-serif;
    }
    .container{
      margin-left: auto;
      margin-right: auto;
      width: 50%;
      background-color: #fff;
      padding: 10px;
    }
    .main {
      text-align: center;
      font-weight: bold;
      
    }
    .main h1 {
      color: #61BA7A;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #FFD200;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      padding: 10px;
      border: none;
      transition: .2s;
      border-radius: 5px;
      cursor: pointer;;
    }
    button:hover {
      border-radius: 20px;
    }
    a {
      text-decoration: none;
      color: #225431;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="main">
    <div class="container">
      <div><h1>Welcome To Saraha APP</h1></div>
      <br>
      <p style=" color: brown;">Thanks for your registration</p>
      <br>
      <p style="color: rgb(210, 129, 22);">Feel free To Click Verify Button to activate you account</p>
      <br>
      <a href="${url}"><button>VERIFY YOUR EMAIL</button></a>
    </div>
  </div>
</body>
</html>`;
};

// export const environment = {
//     production: true,
//     apiUrl: 'https://practicumserver-5ut1.onrender.com'
//   };

export const environment = {
    production: true,
    apiUrl: process.env['API_URL'] || 'http://localhost:5131/api/'
  };
  
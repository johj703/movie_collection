// API키
const API_KEY = "485a7d173048113813de904df9f34a7f";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVhN2QxNzMwNDgxMTM4MTNkZTkwNGRmOWYzNGE3ZiIsIm5iZiI6MTcyMTg2NzkxNS4wNjczNywic3ViIjoiNjVmZDRjYWQ3NzA3MDAwMTdjMGE4MTZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cbkZQGyQg8TkXQEW93ZyqtaR4dVrGhw2j-1FJPufuus",
  }
}

const FIREBASECONFIG = {
  apiKey: "AIzaSyBbu7PSND0vXhPLkmxmPS5PQyrZbE9oOTo",
  authDomain: "teammovie-66f0f.firebaseapp.com",
  projectId: "teammovie-66f0f",
  storageBucket: "teammovie-66f0f.appspot.com",
  messagingSenderId: "607236733584",
  appId: "1:607236733584:web:62d6974161c28ffa187615",
  measurementId: "G-TJ9V2VGZZ6"
};

const BASEURL = "https://api.themoviedb.org/";

export const DEFAPIKEY = { API_KEY, options, FIREBASECONFIG, BASEURL };

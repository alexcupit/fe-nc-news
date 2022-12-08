import React from 'react';
import '../styling/errorPage.css';

function ErrorPage({ err }) {
  let errDesc = '';
  if (err === 'no articles found') {
    errDesc = 'Sorry, there are no articles found with that topic';
  } else if (err) {
    const customMsg = err.response.data.msg;
    if (customMsg === 'id not found') {
      errDesc = "Sorry, we can't find anything with that ID";
    } else if (customMsg === 'input uses invalid data type')
      errDesc =
        "Hmm, something's not right. Please make sure IDs are entered as numbers";
  } else {
    errDesc = "Sorry, we can't find that page";
  }

  return (
    <div className='error-container'>
      <h1>We've found a bump!</h1>
      <p className='error__desc'>{errDesc}</p>
      <img
        className='error__img'
        src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bec1a23-0f79-4beb-ba99-757df5ff5c1e/dbt1p6j-55e808cd-367a-4b56-937c-cfba70169bdf.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzliZWMxYTIzLTBmNzktNGJlYi1iYTk5LTc1N2RmNWZmNWMxZVwvZGJ0MXA2ai01NWU4MDhjZC0zNjdhLTRiNTYtOTM3Yy1jZmJhNzAxNjliZGYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-RGrnAcvtCpAf0CP-ZZ6nEjAPpp-TPWPvIuFzWn3_64'
        alt='Mr Bump loading GIF'
      />
    </div>
  );
}

export default ErrorPage;

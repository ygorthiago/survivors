import React from 'react'

import './styles.css';

function Captcha() {
  var captcha = document.getElementById("captcha");

  var validateCaptcha = function() {
    return "pass";
  }

  function handleClickCaptcha () {
    if (captcha.className.includes("loading")) return;
    
    captcha.className = "";
    
    captcha.className += "loading";
    
    setTimeout(function() {
      captcha.className = captcha.className.replace("loading", "");
      captcha.className += validateCaptcha();
    }, Math.floor((Math.random() * 3000) + 1000));
  }

  return (
    <div id="captcha">
      <div id="checkbox" onClick={handleClickCaptcha}></div>
        I'm not Logan Paul
    </div>
  );
}

export default Captcha;
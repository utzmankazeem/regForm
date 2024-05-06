import { useEffect, useState, useRef } from 'react'
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios'; 

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RegisterUrl = '/register';

const Form = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const res = USER_REGEX.test(user);
    console.log(res)
    console.log(user)
    setValidName(res)
  }, [user])

  useEffect(() => {
    const res = PWD_REGEX.test(pwd);
    console.log(res)
    console.log(pwd)
    setValidPwd(res)
    const match = pwd === matchPwd;
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with js hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
    // try {
    //   const res = await axios.post(RegisterUrl,
    //     JSON.stringify({user, pwd}),
    //     {
    //         headers: {'content-Type': 'application/json'},
    //         withCredentials: true
    //     }
    //   )
    //   console.log(res.data)
    //   console.log(res.accessToken)
    //   console.log(JSON.stringify(res))
    //   setSuccess(true) 
    // } catch (err) {
    //   if(!err?.res) {
    //     setErrMsg('No server resp')
    //   } else if (err.res?.status === 409) {
    //     setErrMsg('UserName taken')
    //   } else {
    //     setErrMsg('Registeration failed')
    //   }
    //     errRef.current.focus();
    // }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>success!</h1>
          <p>
            <a href='#'>Sign In</a>
          </p>
        </section>
      ) : (
        <div className='Form' >
          <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Reg Form</h1>
          <form  onSubmit={handleSubmit}>
            <label htmlFor='username'>
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validName || !user ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id='uidnote' className={userFocus && user &&
              !validName ? "intructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 - 24 chars <br />
              Must start with Letter <br />
              a, 1, _ '' allowed.
            </p>


            <label htmlFor="password">
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validPwd || !pwd ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id='pwdnote' className={pwdFocus && !validPwd ? "intructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 - 24 chars <br />
              Must include Uper&Lower leters, num & spec chars<br />
              Allowed special chars: <span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span> <span aria-label='at hashtag'>#</span>
              <span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
            </p>

            <br />
            <label htmlFor='confirmPwd'>
              Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validMatch || !matchPwd ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input
              type='password'
              id='confirmPwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby='confirmnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id='confirmnote' className={matchFocus && !validMatch ? "intructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
             Must match the password above.
            </p>
            <br />
            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p>
            Already registered<br />
            <span className='line'>
              {/* router link */}
              <a href="#">Sign In</a>
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default Form
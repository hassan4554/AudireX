
const Temp = () => {

    return (
        <></>
    )
}

export default Temp










// const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
// }

// useEffect(() => {
//     if (checkpass != form.password) {
//         submitBtnRef.current.disabled = true
//     }
//     else {
//         submitBtnRef.current.disabled = false;
//     }
// }, [checkpass])

// const handlePasswordCheck = (e) => {
//     setCheckPass(e.target.value);
//     console.log(checkpass == form.pass);
// }

// const handleFormSubmit = async (e) => {
//     e.preventDefault()

//     let a = await fetch(`${hostname}/auth/signup`,
//         {
//             method: 'POST',
//             headers: {
//                 Accept: '/',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(form)
//         }
//     )

//     let response = await a.json();

//     if (response.message == null) {
//         alert(response.error);
//     } else {
//         setAuthPage(<Login />);
//     }
// }



{/* <form className="signup-form" onSubmit={handleFormSubmit}>
                    <div className='form-input'>
                        <input type="text" name="username" onChange={handleInputChange} value={form.username} placeholder='Username' required />
                    </div>
                    <div className='form-input'>
                        <input type="email" name="email" onChange={handleInputChange} value={form.email} placeholder='Email' required />
                    </div>
                    <div className='form-input'>
                        <input type="password" name="password" onChange={handleInputChange} value={form.password} placeholder='Password' required />
                    </div>
                    <div className='form-input'>
                        <input type="password" name="Checkpassword" onChange={handlePasswordCheck} value={checkpass} placeholder='Check Password' required />
                    </div>
                    <div>
                        <input type="submit" value="Signup" className='submitBtn' ref={submitBtnRef} />
                    </div>
                </form> */}
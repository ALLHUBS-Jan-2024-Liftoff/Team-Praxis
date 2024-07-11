import { useState } from "react";

const AccountLogin = () => {
    const [userNameLogin, setuserNameLogin] = useState("")
    const handleuserNameLogin = e => setuserNameLogin(e.target.value);
    const [passwordLogin, setpasswordLogin] = useState("")
    const handlepasswordLogin = e => setpasswordLogin(e.target.value)

  return (
    <div className="container login-container">
        <div className="row">
            <div className="col-md-12 login-form-1">
                    <h2>Account Login</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username *" value={userNameLogin} onChange={handleuserNameLogin} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Password *" value={passwordLogin} onChange={handlepasswordLogin} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" value="       Login       " />
                    </div>
                    <div className="form-group">
                        <a href="#" className="ForgetPwd" value="Login">Forget Password?</a>
                    </div>
                </form>
            </div>
        </div>
          {/* Comment or UnComment Following Line If Space Is Needed */}
        {/* <br /><br /><br /> */}
    </div>
  )
}

export default AccountLogin
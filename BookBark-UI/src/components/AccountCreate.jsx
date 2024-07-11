import { useState } from "react"

const AccountCreate = () => {    
    const [usernameReg, setusernameReg] = useState("")
    const handleUserNameCreate = e => setusernameReg(e.target.value);
    const [passwordReg, setPasswordReg] = useState("")
    const handlePasswordCreate = e => setPasswordReg(e.target.value)

  return (
    <div className="container login-container">
        <div className="row">
            <div className="col-md-12 login-form-1">
                    <h2>New Account</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username *" value={usernameReg} onChange={handleUserNameCreate}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Password *" value={passwordReg} onChange={handlePasswordCreate} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" value="     Register     " />
                    </div>
                </form>
            </div>
        </div>
        {/* Comment or UnComment Following Line If Space Is Needed */}
        <br /><br /><br />
    </div>
  )
}

export default AccountCreate
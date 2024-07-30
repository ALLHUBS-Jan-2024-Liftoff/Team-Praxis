import { useState } from "react"

const UserLogin = () => {
    const [usernameReg, setusernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")

    const handleUserNameCreate = e => setusernameReg(e.target.value);
    const handlePasswordCreate = e => setPasswordReg(e.target.value)

  return (
        <form>
            <div>
                <div>
                    <div>
                        <h2>Bark Book Login</h2>
                        <div>
                            <input type="text" placeholder="Username *" value={usernameReg} onChange={handleUserNameCreate}/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password *" value={passwordReg} onChange={handlePasswordCreate} />
                        </div>
                        <div>
                            <input type="submit" value="Login" />
                        </div>
                        <div>
                            <input type="submit" value="Register" />
                        </div>
                        <div>
                        <a href="#">Forgot Password?</a>
                        </div>
                    </div>
                </div>
                {/* Comment or UnComment Following Line If Space Is Needed */}
                <br /><br /><br />
            </div>
        </form>

  )
}
export default UserLogin;
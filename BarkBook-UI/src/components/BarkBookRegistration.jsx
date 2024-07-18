import React from 'react'
import { useState } from 'react';

const BarkBookRegistration = () => {
    const [usernameReg, setusernameReg] = useState("")
    const handleUserNameCreate = e => setusernameReg(e.target.value);
    const [passwordReg, setPasswordReg] = useState("")
    const handlePasswordCreate = e => setPasswordReg(e.target.value)
    const [passwordConfirmReg, setPasswordConfirmReg] = useState("")
    const handlePasswordConfirmReg = e => setPasswordConfirmReg(e.target.value)

  return (

    <div>
        <div>
            <div>
                    <h2>Bark Book Registration</h2>
                <form>
                    <div>
                        <input type="text" placeholder="Username *" value={usernameReg} onChange={handleUserNameCreate}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password *" value={passwordReg} onChange={handlePasswordCreate} />
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password *" value={passwordConfirmReg} onChange={handlePasswordConfirmReg} />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                    <div>
                        <input type="submit" value="Cancel" />
                    </div>
                </form>
            </div>
        </div>
        {/* Comment or UnComment Following Line If Space Is Needed */}
        <br /><br /><br />
    </div>

  )
}

export default BarkBookRegistration
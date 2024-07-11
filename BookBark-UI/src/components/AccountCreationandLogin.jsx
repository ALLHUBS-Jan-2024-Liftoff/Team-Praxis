const AccountCreationandLogin = () => {
  return (

    <div className="container login-container">
        <div className="row">
            <div className="col-md-12 login-form-1">
                    <h2>New Account</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username *" value="" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Password *" value="" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" value="Create Account" />
                    </div>
                </form>
            </div>
                {/* Comment or UnComment Following Line If Space Is Needed */}
                <br /><br /><br />
        </div>


        <div className="row">
            <div className="col-md-12 login-form-1">
                    <h2>Account Login</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username *" value="" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Password *" value="" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" value="Complete Login" />
                    </div>
                </form>
            </div>
                {/* Comment or UnComment Following Line If Space Is Needed */}
                {/* <br /><br /><br /> */}
        </div>

</div>
    
  )
}

export default AccountCreationandLogin

import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import "./about.css"

const AboutMe = () => {
    const user = useSelector(state => state.session.user);


    if (!user) return <Redirect to='/login'></Redirect>



    return (
        <>
            <div className="about-house">


                <div className="person-info">
                    <div className="pfp">
                        <img className="pfp-img"
                            src="https://i.imgur.com/mBsB8To.png" alt='Jenna'></img>
                    </div>
                    <div className="bio">
                        <div className="name">Jenna Godfrey</div>
                        <a href="https://github.com/jgodfrey324" target="_blank"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/jenna-godfrey-6ba51b107/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div className="person-info">
                    <div className="pfp">
                        <img className="pfp-img"
                            src="https://i.imgur.com/BXj35BF.jpg" alt="Raoul"></img>
                    </div>
                    <div className="bio">
                        <div className="name">Raoul Andalis</div>
                        <a href="https://github.com/raoulandalis" target="_blank"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/raoul-andalis/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div className="person-info">
                    <div className="pfp">
                        <img className="pfp-img"
                            src="https://i.imgur.com/Uq6KjnH.jpg" alt="Pierce"></img>
                    </div>
                    <div className="bio">
                        <div className="name">Pierce Henriksbo</div>
                        <a href="https://github.com/pierceamisprime" target="_blank"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/pierce-henriksbo" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div className="person-info">
                    <div className="pfp">
                        <img className="pfp-img"
                            src="https://i.imgur.com/Z4OqyWx.jpg" alt="Tien"></img>
                    </div>
                    <div className="bio">
                        <div className="name">Tien Hoang</div>
                        <a href="https://github.com/xuantien93" target="_blank"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/tien-hoang-6205b5281"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

            </div>

            <div style={{ marginTop: "100px", marginLeft: '200px' }}>Candlewick on Login Page Made By <a href="https://codepen.io/shorinamaria" target="_blank">@shorinamaria</a></div>

            <div className="footer">


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="flask" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="postgresql" />



                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" />


                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" />



            </div>
        </>
    )
}

export default AboutMe
